import React from 'react';
import PropTypes from 'prop-types';

import Tree from '../model/tree';
import TreeNode from './node';
import shallowEqual from 'shallowequal';

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

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(this.props.data, nextProps.data);
    }

    render() {
        const {data, onOpenNode, onCloseNode} = this.props;
        const tree = Tree.fromData(data);
        return (
            <ul className="rt-tree" ref={ref => { this.treeBaseRef = ref; }}>
                {(tree.children || []).map((node, index) =>
                    <TreeNode key={node.id || index}
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
    onSelectNode: PropTypes.func,
    onDeselectNode: PropTypes.func,
    onOpenNode: PropTypes.func,
    onCloseNode: PropTypes.func
};

Treee.defaultProps = {
    onSelectNode: () => {},
    onDeselectNode: () => {},
    onOpenNode: () => {},
    onCloseNode: () => {}
};

export default Treee;
