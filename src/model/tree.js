'use strict';

import CoreModel from './core-model';
import Node from './node';

export default class Tree extends CoreModel {

    createNode(props) {
        return Object.freeze(new Node(this, props));
    }

    static fromData(data) {
        return new Tree();
    }
}
