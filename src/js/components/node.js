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

    render() {
        return (
            <li ref={ref => { this.topLevelRef = ref; }} className="rt-node">
                {this.renderHeader()}

                {this.renderDrawer()}
            </li>
        );
    }

    renderDrawer() {
        const {node: {toggled}} = this.props;

        return (
            <VelocityTransitionGroup enter={{ animation: 'slideDown', duration: 300 }}
                                     leave={{ animation: 'slideUp', duration: 300 }}>
                {toggled ? this.renderChildren() : null}
            </VelocityTransitionGroup>
        );
    }

    renderHeader() {
        const {node} = this.props;

        return (
            <NodeHeader node={Object.assign({}, node)}
                        onClick={this.select.bind(this)}
                        onOpen={this.toggle.bind(this)} />
        );
    }

    renderChildren() {
        const {node} = this.props;

        if (node.loading) {
            return this.renderLoading();
        }

        const childNodes = node.children && Array.isArray(node.children) ? node.children : [];

        return (
            <ul className="rt-tree" ref={ref => { this.subtreeRef = ref; }}>
                {
                    childNodes.map((child, index) => {

                        return (<TreeNode {...this._eventBubbles()}
                                          key={child.id || index}
                                          node={child} />);
                    })
                }
            </ul>
        );
    }

    renderLoading() {
        return (
            <ul className="rt-tree">
                <li>
                    <Loading />
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
    node: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
};

export default TreeNode;
