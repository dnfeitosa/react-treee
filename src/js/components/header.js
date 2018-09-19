import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';
import {Container} from './decorators';

class NodeHeader extends React.Component {
    shouldComponentUpdate(nextProps) {
        const props = this.props;
        const nextPropKeys = Object.keys(nextProps);

        for (let i = 0; i < nextPropKeys.length; i++) {
            const key = nextPropKeys[i];
            if (key === 'animations') {
                continue;
            }

            const isEqual = shallowEqual(props[key], nextProps[key]);
            if (!isEqual) {
                return true;
            }
        }

        return false;
    }

    render() {
        const {node, onClick, onOpen} = this.props;
        const {children} = node;
        const terminal = !children;

        return (
            <Container node={node}
                       onClick={onClick}
                       onOpen={onOpen}
                       terminal={terminal} />
        );
    }
}

NodeHeader.propTypes = {
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onOpen: PropTypes.func
};

export default NodeHeader;
