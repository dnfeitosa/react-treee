/*  eslint no-unused-expressions:0  */

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import sinon from 'sinon';

import TreeNode from '../../js/components/node';
import Treee from '../../js/components/treee';

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
        it('should not throw error when onSelectNode callback is not defined', () => {
            const treee = TestUtils.renderIntoDocument(<Treee data={defaults} />);
            const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

            (() => node.select()).should.not.throw(Error);
        });

        it('should set the selected node to active', (done) => {
            const onSelect = (node) => {
                node.active.should.be.true;
                done();
            };

            const treee = TestUtils.renderIntoDocument(<Treee data={defaults} onSelectNode={onSelect} />);
            const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

            node.select();
        });

        it('should call the onSelect callback with the new selection', () => {
            const onSelect = sinon.spy();
            const treee = TestUtils.renderIntoDocument(<Treee data={defaults} onSelectNode={onSelect} />);
            const node = TestUtils.findRenderedComponentWithType(treee, TreeNode);

            node.select();

            onSelect.withArgs(node.props.node).should.be.called.once;
        });

        it('should call the onDeselect callback with previous selection', () => {
            const nodes = [
                {name: 'node 1'},
                {name: 'node 2'}
            ];
            const onDeselect = sinon.spy();
            const treee = TestUtils.renderIntoDocument(<Treee data={nodes} onDeselectNode={onDeselect} />);
            const ns = TestUtils.scryRenderedComponentsWithType(treee, TreeNode);

            ns[0].select();
            ns[1].select();

            onDeselect.withArgs(ns[0].props.node).should.be.called.once;
        });
    });
});
