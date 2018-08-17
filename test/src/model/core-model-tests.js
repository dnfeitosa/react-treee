'use strict';

import CoreModel from '../../../src/model/core-model';
import Node from '../../../src/model/node';

class TestModel extends CoreModel {
    createNode(props) {
        return Object.freeze(new Node(this, props));
    }
}

describe('model/CoreModel', () => {
    describe('child access', () => {
        let model;

        beforeEach(() => {
            model = new TestModel();
            model.appendChild(model.createNode({id: 'child1', data: { name: 'child 1'}}));
            model.appendChild(model.createNode({id: 'child2', data: { name: 'child 2'}}));
        });

        it('returns all childs', () => {
            model.childNodes.length.should.be.equal(2);
        });

        it('return a child node by id', () => {
            model.getChildById('child1').data.name.should.be.equal('child 1');
            model.getChildById('child2').data.name.should.be.equal('child 2');
        });
    });
});
