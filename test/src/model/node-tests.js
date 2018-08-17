'use strict';

import Node from '../../../src/model/node';

describe('model/Node', () => {

    describe('child creation', () => {
        it('returns a sealed node', () => {
            const parent = new Node(null, {});
            const node = parent.createNode({id: 'child', data: {name: 'child 1'}});

            (() => node.newProperty = 123).should.throw(TypeError);
            (() => node.id = 'will fail').should.throw(TypeError);
        });
    });
});
