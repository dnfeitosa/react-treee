/*  eslint no-unused-expressions:0  */

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import Header from '../../js/components/header';
import {Container} from '../../js/components/decorators';

const defaults = {
    node: {children: []},
    animations: {toggle: {}}
};

describe('header component', () => {
    it('should render the container decorator', () => {
        const header = TestUtils.renderIntoDocument(<Header {...defaults}/>);
        const container = TestUtils.findRenderedComponentWithType(header, Container);

        container.should.exist;
    });

    it('should update the component if a prop changes', () => {
        const node = {toggled: false};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}/>
        );
        const nextProps = {node: {toggled: !node.toggled}};

        header.shouldComponentUpdate(nextProps).should.be.true;
    });

    it('should not update the component if no props change', () => {
        const node = {toggled: false};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}/>
        );
        const nextProps = Object.assign({}, defaults, {node: {toggled: node.toggled}});

        header.shouldComponentUpdate(nextProps).should.be.false;
    });

    it('should pass a true terminal prop to the container when there are no children in the node', () => {
        const node = {name: 'terminal-node'};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, Container);

        container.props.terminal.should.be.true;
    });

    it('should pass a false terminal prop to the container when there are children in the node', () => {
        const node = {children: [{name: 'child-node'}]};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, Container);

        container.props.terminal.should.be.false;
    });
});
