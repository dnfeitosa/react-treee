import React from 'react';
import PropTypes from 'prop-types';

import Tree from '../model/tree';
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
        const {animations, decorators, data, onOpenNode, onCloseNode, style} = this.props;

        const tree = Tree.fromData(data);
        return (
            <ul style={style.tree.base}
                ref={ref => { this.treeBaseRef = ref; }}>
                {(tree.children || []).map((node, index) =>
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
    onDeselectNode: PropTypes.func,
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
