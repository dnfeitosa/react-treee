/*  eslint no-unused-expressions:0  */

'use strict';

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import sinon from 'sinon';

import defaultDecorators from '../../../src/components/decorators';
import TreeNode from '../../../src/components/node';
import Treee from '../../../src/components/treee';
import defaultAnimations from '../../../src/themes/animations';
import defaultTheme from '../../../src/themes/default';

const defaults = {
    name: '',
    children: []
};

describe('treee component', () => {
    it('should render the treebase as a list', () => {
        const treee = TestUtils.renderIntoDocument(<Treee data={defaults}/>);
        const treeBase = treee.treeBaseRef;

        treeBase.tagName.toLowerCase().should.equal('ul');
    });

    it('should render the treebase as a list', () => {
        const treee = TestUtils.renderIntoDocument(<Treee data={defaults}/>);
        const nodes = TestUtils.scryRenderedComponentsWithType(treee, TreeNode);

        nodes.length.should.equal(1);
    });

    it('should pass the top level tree node the associated props', () => {
        const treee = TestUtils.renderIntoDocument(
            <Treee data={defaults}
                       onSelect={() => null}/>
        );
        const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

        node.props.node.should.equal(treee.props.data);
    });

    it('should use the default theme if none specified', () => {
        const treee = TestUtils.renderIntoDocument(<Treee data={defaults}/>);
        const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

        node.props.style.should.equal(defaultTheme.tree.node);
    });

    it('should use the default animations if none specified', () => {
        const treee = TestUtils.renderIntoDocument(<Treee data={defaults}/>);
        const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

        node.props.animations.should.equal(defaultAnimations);
    });

    it('should use the default decorators if none specified', () => {
        const treee = TestUtils.renderIntoDocument(<Treee data={defaults}/>);
        const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

        node.props.decorators.should.equal(defaultDecorators);
    });

    it('should support rendering multiple nodes at the root level', () => {
        const multipleRootNodes = [
            {name: 'root-1', children: []},
            {name: 'root-2', children: []}
        ];
        const treee = TestUtils.renderIntoDocument(<Treee data={multipleRootNodes}/>);
        const nodes = TestUtils.scryRenderedComponentsWithType(treee, TreeNode);

        nodes.length.should.equal(multipleRootNodes.length);
    });

    describe('when selecting a node', () => {
        it('should set the selected node to active', (done) => {
            const onSelect = (node) => {
                node.active.should.be.true;
                done();
            };

            const treee = TestUtils.renderIntoDocument(<Treee data={defaults} onSelect={onSelect} />);
            const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

            node.select();
        });

        it('should call the onSelect callback with selected node as argument', () => {
            const onSelect = sinon.spy();
            const treee = TestUtils.renderIntoDocument(<Treee data={defaults} onSelect={onSelect} />);
            const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

            node.select();

            onSelect.withArgs(node.props.node, undefined).should.be.called.once;
        });

        it('should call the onSelect callback with current and previous selected node as argument', () => {
            const nodes = [
                {name: 'node 1'},
                {name: 'node 2'}
            ];
            const onSelect = sinon.spy();
            const treee = TestUtils.renderIntoDocument(<Treee data={nodes} onSelect={onSelect} />);
            const ns = TestUtils.scryRenderedComponentsWithType(treee, TreeNode);

            ns[0].select();
            ns[1].select();

            onSelect.withArgs(ns[0].props.node, undefined).should.be.called.once;
            onSelect.withArgs(ns[1].props.node, ns[0].props.node).should.be.called.once;
        });
    });
});
