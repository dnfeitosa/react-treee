'use strict';

export default class CoreModel {
    children = [];

    appendChild(node) {
        this.children.push(node);
    }

    getChildById(id) {
        return this.children.find((n) => n.id === id);
    }
}
