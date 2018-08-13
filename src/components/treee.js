'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

class Treee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    select(node) {
        const {onSelectNode} = this.props;
        const {selected: previous} = this.state;

        if (previous) {
            previous.deactivate();
        }
        node.activate();

        if (onSelectNode) {
            const previousNode = previous
                ? previous.props.node
                : undefined;
            onSelectNode(node.props.node, previousNode);
        }

        this.setState({selected: node});
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {animations, decorators, data, onOpenNode, onCloseNode, style} = this.props;

        // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
        const treeData = Array.isArray(data)
            ? data
            : [data];

        return (
            <ul style={style.tree.base}
                ref={ref => this.treeBaseRef = ref}>
                {treeData.map((node, index) =>
                    <TreeNode animations={animations}
                              decorators={decorators}
                              key={node.id || index}
                              node={node}
                              onSelect={this.select.bind(this)}
                              onOpen={onOpenNode}
                              onClose={onCloseNode}
                              style={style.tree.node}/>
                )}
            </ul>
        );
    }
}

Treee.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onSelectNode: PropTypes.func,
    onOpenNode: PropTypes.func,
    onCloseNode: PropTypes.func,
    decorators: PropTypes.object
};

Treee.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default Treee;
