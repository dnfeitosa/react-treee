/*  eslint no-unused-expressions:0  */

'use strict';

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import sinon from 'sinon';
import {VelocityTransitionGroup as TransitionGroup} from 'velocity-react';

import Tree from '../../../src/model/tree';
import Node from '../../../src/model/node';
import NodeHeader from '../../../src/components/header';
import TreeNode from '../../../src/components/node';
import style from '../../../src/themes/default';

import {createAnimations, createDecorators} from '../utils/factory';

const defaults = {
    style: style.tree.node,
    node: {chilren: []},
    animations: createAnimations(),
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

    it('should use the node animations if defined', () => {
        const nodeAnimations = {
            toggle: sinon.stub().returns({duration: 0, animation: 'fadeIn'}),
            drawer: sinon.stub().returns({duration: 0, animation: 'fadeIn'})
        };
        const node = new Node(null, {animations: nodeAnimations});
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode{...defaults}
                     node={node}/>
        );
        treeNode.animations();

        nodeAnimations.toggle.should.be.calledWith(treeNode.props);
        nodeAnimations.drawer.should.be.calledWith(treeNode.props);
    });

    it('should fallback to the prop animations if the node animations are not defined', () => {
        const animations = {
            toggle: sinon.stub().returns({duration: 0, animation: 'fadeIn'}),
            drawer: sinon.stub().returns({duration: 0, animation: 'fadeIn'})
        };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode{...defaults}
                     animations={animations}/>
        );
        treeNode.animations();

        animations.toggle.should.be.calledWith(treeNode.props);
        animations.drawer.should.be.calledWith(treeNode.props);
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

    it('should pass velocity the drawer enter animation and duration props', () => {
        const animations = createAnimations();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      animations={animations}/>
        );
        const velocity = treeNode.velocityRef;
        const drawer = animations.drawer();

        velocity.props.enter.animation.should.equal(drawer.enter.animation);
        velocity.props.enter.duration.should.equal(drawer.enter.duration);
    });

    it('should pass velocity the drawer leave animation and duration props', () => {
        const animations = createAnimations();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      animations={animations}/>
        );
        const velocity = treeNode.velocityRef;
        const drawer = animations.drawer();

        velocity.props.leave.animation.should.equal(drawer.leave.animation);
        velocity.props.leave.duration.should.equal(drawer.leave.duration);
    });

    it('should not render a velocity component if animations is false and not toggled', () => {
        const node = new Node(null, {toggled: false});
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      animations={false}
                      node={node}/>
        );
        const velocity = treeNode.velocityRef;

        global.should.not.exist(velocity);
    });

    it('should not render a velocity component if animations is false and toggled', () => {
        const node = new Node(null, {toggled: true});
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      animations={false}
                      node={node}/>
        );
        const velocity = treeNode.velocityRef;

        global.should.not.exist(velocity);
    });

    it('should render a velocity component if animations is an object', () => {
        const animations = createAnimations();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      animations={animations}/>
        );
        const velocity = treeNode.velocityRef;

        velocity.should.exist;
    });

    it('should wrap the children in a list', () => {
        const node = new Node(null, {toggled: true});
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node}/>
        );
        const subtree = treeNode.subtreeRef;

        subtree.tagName.toLowerCase().should.equal('ul');
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

    // it('should render the loading decorator if the node is loading and toggled', () => {
    //     class LoadingDecorator extends React.Component {
    //         render() {
    //             return <div/>;
    //         }
    //     }
    //     const decorators = createDecorators({loading: LoadingDecorator});
    //     const node = new Node(null, {toggled: true, loading: true});
    //     const treeNode = TestUtils.renderIntoDocument(
    //         <TreeNode {...defaults}
    //                   node={node}
    //                   decorators={decorators}/>
    //     );
    //     const loading = TestUtils.findRenderedComponentWithType(treeNode, LoadingDecorator);
    //
    //     loading.should.exist;
    // });

    // it('should not render the loading decorator if the node is not loading but toggled', () => {
    //     class LoadingDecorator extends React.Component {
    //         render() {
    //             return <div/>;
    //         }
    //     }
    //     const decorators = createDecorators({loading: LoadingDecorator});
    //     const node = new Node(null, {toggled: true, loading: false});
    //     const treeNode = TestUtils.renderIntoDocument(
    //         <TreeNode {...defaults}
    //                   node={node}
    //                   decorators={decorators}/>
    //     );
    //     const loading = TestUtils.scryRenderedComponentsWithType(treeNode, LoadingDecorator);
    //
    //     loading.should.be.empty;
    // });

    it('should not render the children if the node is Loading', () => {
        const node = new Node(null, {toggled: true, loading: true});
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                      node={node} />
        );

        global.should.not.exist(treeNode.subtreeRef);
    });
});
