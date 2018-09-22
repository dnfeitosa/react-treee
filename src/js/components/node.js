import React from 'react';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';
import ChildNodes from './child-nodes';

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
            <ChildNodes node={node} {...{onOpen, onClose, onSelect}} ref={ref => { this.subtreeRef = ref; }}/>
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
