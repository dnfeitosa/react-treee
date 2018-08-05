'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

class Treee extends React.Component {
    render() {
        const {animations, decorators, data, onSelect, onOpen, onClose, style} = this.props;

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
                              onSelect={onSelect}
                              onOpen={onOpen}
                              onClose={onClose}
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
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    decorators: PropTypes.object
};

Treee.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default Treee;
