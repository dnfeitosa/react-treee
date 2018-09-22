/*  eslint no-unused-expressions:0  */

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import sinon from 'sinon';
import {VelocityTransitionGroup as TransitionGroup} from 'velocity-react';

import Tree from '../../js/model/tree';
import Node from '../../js/model/node';
import NodeHeader from '../../js/components/header';
import {Loading} from '../../js/components/decorators';
import TreeNode from '../../js/components/node';

import {createDecorators} from '../utils/factory';

const defaults = {
    node: {chilren: []},
    decorators: createDecorators()
};

describe('node component', () => {
    it('should mark the node as active when selected', () => {
        const node = new Node(null, {active: false});
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node} />
        );
        treeNode.activate();

        const component = TestUtils.findRenderedComponentWithType(treeNode, TreeNode);
        component.state.node.active.should.be.true;
    });

    it('should mark the node as not active when deactivated', () => {
        const node = new Node(null, {active: true});
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node} />
        );
        treeNode.deactivate();

        const component = TestUtils.findRenderedComponentWithType(treeNode, TreeNode);
        component.state.node.active.should.be.false;
    });

    it('should call the onOpen callback when expanding the node', () => {
        const node = new Node(null, {toggled: false});
        const onOpen = sinon.spy();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node}
                      onOpen={onOpen}/>
        );
        treeNode.toggle();

        onOpen.should.be.called.once;
    });

    it('should not call the onOpen callback when collapsing the node', () => {
        const node = new Node(null, {toggled: true});
        const onOpen = sinon.spy();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node}
                      onOpen={onOpen}/>
        );
        treeNode.toggle();

        onOpen.should.not.be.called;
    });

    it('should call the onClose callback when collapsing the node', () => {
        const node = new Node(null, {toggled: true});
        const onClose = sinon.spy();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node}
                      onClose={onClose}/>
        );
        treeNode.toggle();

        onClose.should.be.called.once;
    });

    it('should not call the onClose callback when expanding the node', () => {
        const node = new Node(null, {toggled: false});
        const onClose = sinon.spy();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node}
                      onClose={onClose}/>
        );
        treeNode.toggle();

        onClose.should.not.be.called;
    });

    it('should call the onSelect callback once if it is registered on click', () => {
        const onSelect = sinon.spy();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                onSelect={onSelect}
            />
        );
        treeNode.select();

        onSelect.should.be.called.once;
    });

    it('should not throw an exception if a callback is not registered on click', () => {
        const treeNode = TestUtils.renderIntoDocument(<TreeNode {...defaults}/>);

        (() => treeNode.select()).should.not.throw(Error);
    });

    it('should render a list item at the top level', () => {
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        const topLevel = treeNode.topLevelRef;
        topLevel.tagName.toLowerCase().should.equal('li');
    });

    it('should render the NodeHeader component', () => {
        const treeNode = TestUtils.renderIntoDocument(<TreeNode {...defaults}/>);
        const component = TestUtils.findRenderedComponentWithType(treeNode, NodeHeader);

        component.should.exist;
    });

    it('should render the subtree if toggled', () => {
        const node = new Node(null, {toggled: true});
        const treeNode = TestUtils.renderIntoDocument(<TreeNode {...defaults} node={node}/>);

        treeNode.subtreeRef.should.exist;
    });

    it('should not render the children if not toggled', () => {
        const node = new Node(null, {toggled: false});
        const treeNode = TestUtils.renderIntoDocument(<TreeNode {...defaults} node={node}/>);

        global.should.not.exist(treeNode.subtreeRef);
    });

    it('should wrap the children in a velocity transition group', () => {
        const treeNode = TestUtils.renderIntoDocument(<TreeNode {...defaults}/>);
        const component = TestUtils.findRenderedComponentWithType(treeNode, TransitionGroup);

        component.should.exist;
    });

    it('should render a TreeNode component for each child', () => {
        const tree = Tree.fromData({
            name: 'root',
            toggled: true,
            children: [
                { name: 'child 1' },
                { name: 'child 2' },
                { name: 'child 3' }
            ]
        });
        const node = tree.children[0];

        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node}/>
        );
        // Find All TreeNodes (+ Top Level TreeNode)
        const nodes = TestUtils.scryRenderedComponentsWithType(treeNode, TreeNode);

        nodes.length.should.equal(node.children.length + 1);
    });

    it('should not render the children if the node is Loading', () => {
        const node = new Node(null, {toggled: true, loading: true});
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node} />
        );

        const component = TestUtils.scryRenderedComponentsWithType(treeNode, Loading);
        component.should.exist;
    });
});
