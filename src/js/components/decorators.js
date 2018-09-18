import React from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';

const Loading = () => {
    return <div className="rt-loading">loading...</div>;
};
Loading.propTypes = {
    style: PropTypes.object
};

const Toggle = ({onOpen}) => {
    return (
        <div className="rt-toggle" onClick={onOpen}>
            <div className="rt-toggle-wrapper">
            </div>
        </div>
    );
};

Toggle.propTypes = {
    onOpen: PropTypes.func
};

const Header = ({node, onClick}) => {
    const iconClass = `rt-node-icon fa fa-${node.icon}`;

    return (
        <div className="rt-node-header" onClick={onClick}>
            <div className="rt-node-title">
                <i className={iconClass} />

                {node.name}
            </div>
        </div>
    );
};
Header.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    node: PropTypes.object.isRequired
};

class Container extends React.Component {
    render() {
        const {terminal, onClick, node} = this.props;
        const classes = ['rt-link', node.active ? 'rt-link-active' : null];

        return (
            <div ref={ref => { this.clickableRef = ref; }} className={classes.join(' ')}>
                {!terminal ? this.renderToggle() : null}

                <Header onClick={onClick} node={node} />
            </div>
        );
    }

    renderToggle() {
        const {node} = this.props;

        return (
            <VelocityComponent animation={{rotateZ: node.toggled ? 90 : 0}}
                               duration={300}
                               ref={ref => { this.velocityRef = ref; }}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {
        const {onOpen} = this.props;

        return <Toggle onOpen={onOpen} />;
    }
}
Container.propTypes = {
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    onOpen: PropTypes.func,
    node: PropTypes.object.isRequired
};

export {
    Loading,
    Toggle,
    Header,
    Container
};
