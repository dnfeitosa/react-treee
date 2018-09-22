import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './node';
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

ChildNodes.propTypes = {
    node: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
};

export default ChildNodes;
