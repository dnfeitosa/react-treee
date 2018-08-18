'use strict';

import Node from '../../../src/model/node';

describe('model/Node', () => {

    // describe('child creation', () => {
    //     it('returns a sealed node', () => {
    //         const parent = new Node(null, {});
    //         const node = parent.createNode({id: 'child', data: {name: 'child 1'}});
    //
    //         (() => node.newProperty = 123).should.throw(TypeError);
    //         (() => node.id = 'will fail').should.throw(TypeError);
    //     });
    // });

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
        });

        it('should ignore the "children" property', () => {
            const node = new Node(null, {
                id: 'id',
                name: 'name',
                children: ['should', 'ignore', 'this', 'data']
            });

            node.children.length.should.be.equal(0);
        });
    });
});
