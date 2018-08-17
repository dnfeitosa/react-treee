'use strict';

import Tree from '../../../src/model/tree';

describe('model/Tree', () => {

    describe('child creation', () => {
        it('returns a sealed node', () => {
            const tree = new Tree();
            const node = tree.createNode({id: 'child', data: {name: 'child 1'}});

            (() => node.newProperty = 123).should.throw(TypeError);
            (() => node.id = 'will fail').should.throw(TypeError);
        });
    });
});
