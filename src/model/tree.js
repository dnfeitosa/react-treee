'use strict';

import CoreModel from './core-model';
import Node from './node';

export default class Tree extends CoreModel {

    createNode(props) {
        return new Node(this, props);
        // return Object.seal(new Node(this, props));
    }

    static fromData(data) {
        const tree = new Tree();
        // Support multiple root nodes
        const treeData = Array.isArray(data)
            ? data
            : [data];

        return Node.fromData(tree, treeData);
    }
}
