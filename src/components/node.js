import React from 'react';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';
import {Loading} from './decorators';

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node: props.node
        };
    }

    toggle() {
        const {onOpen, onClose} = this.props;
        const {node} = this.state;

        if (!node.toggled && onOpen) {
            onOpen(node);
        }

        if (node.toggled && onClose) {
            onClose(node);
        }

        if (node.children) {
            node.toggled = !node.toggled;
        }

        this.setState({node});
    }

    deactivate() {
        const {node} = this.state;
        node.active = false;

        this.setState({node});
    }

    activate() {
        const {node} = this.state;
        node.active = true;

        this.setState({node});
    }

    select() {
        const {onSelect} = this.props;

        if (onSelect) {
            onSelect(this);
        }
    }

    animations() {
        const {animations, node} = this.props;

        if (animations === false) {
            return false;
        }

        const anim = Object.assign({}, animations, node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props)
        };
    }

    render() {
        const {style} = this.props;
        const animations = this.animations();

        return (
            <li ref={ref => { this.topLevelRef = ref; }}
                style={style.base}>
                {this.renderHeader(animations)}

                {this.renderDrawer(animations)}
            </li>
        );
    }

    renderDrawer(animations) {
        const {node: {toggled}} = this.props;

        if (!animations && !toggled) {
            return null;
        } else if (!animations && toggled) {
            return this.renderChildren(animations);
        }

        const {...restAnimationInfo} = animations.drawer;
        return (
            <VelocityTransitionGroup {...restAnimationInfo}
                                     ref={ref => { this.velocityRef = ref; }}>
                {toggled ? this.renderChildren(animations) : null}
            </VelocityTransitionGroup>
        );
    }

    renderHeader(animations) {
        const {node, style} = this.props;

        return (
            <NodeHeader animations={animations}
                        node={Object.assign({}, node)}
                        onClick={this.select.bind(this)}
                        onOpen={this.toggle.bind(this)}
                        style={style}/>
        );
    }

    renderChildren() {
        const {animations, node, style} = this.props;

        if (node.loading) {
            return this.renderLoading();
        }

        return (
            <ul style={style.subtree} ref={ref => { this.subtreeRef = ref; }}>
                {
                    (node.children || []).map((child, index) => {

                        return (<TreeNode {...this._eventBubbles()}
                                          animations={animations}
                                          key={child.id || index}
                                          node={child}
                                          style={style}/>);
                    })
                }
            </ul>
        );
    }

    renderLoading() {
        const {style} = this.props;

        return (
            <ul style={style.subtree}>
                <li>
                    <Loading style={style.loading}/>
                </li>
            </ul>
        );
    }

    _eventBubbles() {
        const {onSelect, onOpen, onClose} = this.props;

        return {
            onSelect,
            onOpen,
            onClose
        };
    }
}

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
};

export default TreeNode;
