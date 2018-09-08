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

        return !deepEqual(props.animations, nextProps.animations, {strict: true});
    }

    render() {
        const {animations, node, onClick, onOpen} = this.props;
        const {children} = node;
        const terminal = !children;
        const classes = ['rt-link', node.active ? 'rt-link-active' : null];

        return (
            <Container animations={animations}
                       node={node}
                       onClick={onClick}
                       onOpen={onOpen}
                       terminal={terminal}
                       className={classes.join(' ')}/>
        );
    }
}

NodeHeader.propTypes = {
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onOpen: PropTypes.func
};

export default NodeHeader;
