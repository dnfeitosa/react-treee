'use strict';

import CoreModel from './core-model';

export default class Node extends CoreModel {

    constructor(parent, {id, name, toggled, active, /* temporary */ animations, /* temporary */ decorators, /* temporary */ loading}) {
        super();
        this.parent = parent;
        this.id = id;
        this.name = name;
        this.toggled = toggled;
        this.active = active;
        this.animations = animations;
        this.decorators = decorators;
        this.loading = loading;
    }

    previousSibling() {

    }

    nextSibling() {

    }

    createNode(props) {
        return new Node(this, props);
        // return Object.seal(new Node(this, props));
    }

    static fromData(parent, nodes) {
        nodes.map((props /* , index */) => {
            const node = parent.createNode(props);
            if (props.children) {
                this.fromData(node, props.children);
            }
            parent.appendChild(node);
        });

        return parent;
    }
}
