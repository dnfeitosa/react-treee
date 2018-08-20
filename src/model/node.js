'use strict';
import CoreModel from './core-model';

export default class Node extends CoreModel {

    constructor(parent, props) {
        super();
        this.parent = parent;
        const {children, ...data} = props;

        Object.assign(this, data);
    }

    previousSibling() {
        if (!this.parent) {
            return undefined;
        }
        const position = this.parent.childrenPosition(this);
        return this.parent.childrenAt(position - 1);
    }

    nextSibling() {
        if (!this.parent) {
            return undefined;
        }
        const position = this.parent.childrenPosition(this);
        return this.parent.childrenAt(position + 1);
    }

    createNode(props) {
        return new Node(this, props);
    }

    static fromData(parent, children) {
        if (!children) {
            return parent;
        }

        if (!Array.isArray(children)) {
            parent.children = true;
            return parent;
        }

        children.map((props /* , index */) => {
            const node = parent.createNode(props);
            Node.fromData(node, props.children);
            parent.appendChild(node);
        });

        return parent;
    }
}
