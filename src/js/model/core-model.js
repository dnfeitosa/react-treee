export default class CoreModel {
    children;

    appendChild(node) {
        if (!Array.isArray(this.children)) {
            this.children = [];
        }
        this.children.push(node);
    }

    getChildById(id) {
        return this.children.find(n => n.id === id);
    }

    childrenPosition(element) {
        return this.children
            ? this.children.indexOf(element)
            : -1;
    }

    childrenAt(position) {
        return this.children
            ? this.children[position]
            : null;
    }
}
