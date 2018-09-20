import React from 'react';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';
import {Loading} from './decorators';

class ChildNodes extends React.Component {

    render() {
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

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node: props.node
        };
    }

    toggle() {
        const {node, onOpen, onClose} = this.props;

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

    static getDerivedStateFromProps(props, state) {
        return {
            node: Object.assign({}, props.node)
        };
    }

    deactivate() {
        const {node} = this.props;
        node.active = false;

        this.setState({});
    }

    activate() {
        const {node} = this.props;
        node.active = true;

        this.setState({});
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
        const {node: {toggled}} = this.state;

        return (
            <VelocityTransitionGroup enter={{ animation: 'slideDown', duration: 300 }}
                                     leave={{ animation: 'slideUp', duration: 300 }}>
                {toggled ? this.renderChildren() : null}
            </VelocityTransitionGroup>
        );
    }

    renderHeader() {
        const {node} = this.state;

        return (
            <NodeHeader node={Object.assign({}, node)}
                        onClick={this.select.bind(this)}
                        onOpen={this.toggle.bind(this)} />
        );
    }

    renderChildren() {
        const {onOpen, onClose, onSelect} = this.props;
        const {node} = this.state;
        return (
            <ChildNodes node={node} {...{onOpen, onClose, onSelect}} />
        );
    }
}

TreeNode.propTypes = {
    node: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
};

export default TreeNode;
