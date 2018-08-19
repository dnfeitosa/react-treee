'use strict';

import Node from '../../../src/model/node';

describe('model/Node', () => {

    describe('child creation', () => {
        // it('returns a sealed node', () => {
        //     const parent = new Node(null, {});
        //     const node = parent.createNode({id: 'child', data: {name: 'child 1'}});
        //
        //     (() => node.newProperty = 123).should.throw(TypeError);
        //     (() => node.id = 'will fail').should.throw(TypeError);
        // });

        describe('from data', () => {
            it('should create the child nodes', () => {
                const node = Node.fromData(new Node(null, {}), [{ id: 'child node' }]);

                node.children.length.should.be.equal(1);
            });

            describe('when children has no data', () => {
                it('should not have a children attribute', () => {
                    const node = Node.fromData(new Node(null, {}), []);

                    (node.children === undefined).should.be.true;
                });
            });

            describe('when children nodes will be loaded on a later moment', () => {
                it('should set the children attribute as true', () => {
                    const node = Node.fromData(new Node(null, {}), true);

                    node.children.should.be.true;
                });
            });
        });
    });

    describe('instantiation', () => {
        it('should read the parameter properties and assign to fields', () => {
            const node = new Node(null, {
                id: 'id',
                name: 'name',
                toggled: true,
                active: true
            });

            node.id.should.be.equal('id');
            node.name.should.be.equal('name');
            node.toggled.should.be.true;
            node.active.should.be.true;
            (node.children === undefined).should.be.true;
        });

        it('should ignore the "children" property', () => {
            const node = new Node(null, {
                id: 'id',
                name: 'name',
                children: ['should', 'ignore', 'this', 'data']
            });

            (node.children === undefined).should.be.true;
        });
    });
});
