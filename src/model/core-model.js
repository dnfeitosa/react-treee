'use strict';

export default class CoreModel {
    childNodes = [];

    appendChild(node) {
        this.childNodes.push(node);
    }

    getChildById(id) {
        return this.childNodes.find((n) => n.id === id);
    }
}
