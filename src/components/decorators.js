import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
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
                &gt;
            </div>
        </div>
    );
};

Toggle.propTypes = {
    onOpen: PropTypes.func
};

const Header = ({node, onClick}) => {
    const iconType = node.type === 'folder' ? 'folder' : 'file-text';
    const iconClass = `rt-node-icon fa fa-${iconType}`;

    return (
        <div className="rt-node-header">
            <div onClick={onClick} className="rt-node-title">
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

@Radium
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
        const {animations} = this.props;

        if (!animations) {
            return this.renderToggleDecorator();
        }

        return (
            <VelocityComponent animation={animations.toggle.animation}
                               duration={animations.toggle.duration}
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
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired
};

export {
    Loading,
    Toggle,
    Header,
    Container
};
