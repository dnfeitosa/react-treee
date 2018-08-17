'use strict';

import CoreModel from './core-model';

export default class Node extends CoreModel {

    constructor(parent, {id, data, state}) {
        super();
        this.parent = parent;
        this._id = id;
        this.data = data;
        this.state = state;
    }

    get id() {
        return this._id;
    }

    previousSibling() {

    }

    nextSibling() {

    }

    createNode(props) {
        return Object.freeze(new Node(this, props));
    }
}
