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
        const {onSelect} = this.props;
        const {selected: previous} = this.state;

        if (previous) {
            previous.active = false;
        }
        node.active = true;

        onSelect(node, previous);

        this.setState({selected: node});
    }

    render() {
        const {animations, decorators, data, onOpen, onClose, style} = this.props;

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
