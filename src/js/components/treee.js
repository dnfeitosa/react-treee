import React from 'react';
import PropTypes from 'prop-types';

import Tree from '../model/tree';
import TreeNode from './node';
import defaultAnimations from '../themes/animations';

class Treee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    select(node) {
        const {onSelectNode, onDeselectNode} = this.props;
        const {selected: previous} = this.state;

        if (previous) {
            previous.deactivate();
        }
        node.activate();

        if (onDeselectNode && previous) {
            onDeselectNode(previous.props.node);
        }

        if (onSelectNode) {
            onSelectNode(node.props.node);
        }

        this.setState({selected: node});
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {animations, data, onOpenNode, onCloseNode} = this.props;

        const tree = Tree.fromData(data);
        return (
            <ul className="rt-tree" ref={ref => { this.treeBaseRef = ref; }}>
                {(tree.children || []).map((node, index) =>
                    <TreeNode animations={animations}
                              key={node.id || index}
                              node={node}
                              onSelect={this.select.bind(this)}
                              onOpen={onOpenNode}
                              onClose={onCloseNode} />
                )}
            </ul>
        );
    }
}

Treee.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onSelectNode: PropTypes.func,
    onDeselectNode: PropTypes.func,
    onOpenNode: PropTypes.func,
    onCloseNode: PropTypes.func
};

Treee.defaultProps = {
    animations: defaultAnimations
};

export default Treee;
