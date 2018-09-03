import Tree from '../../../src/model/tree';

describe('model/Tree', () => {

    // describe('child creation', () => {
    //     it('returns a sealed node', () => {
    //         const tree = new Tree();
    //         const node = tree.createNode({id: 'child', data: {name: 'child 1'}});
    //
    //         (() => node.newProperty = 123).should.throw(TypeError);
    //         (() => node.id = 'will fail').should.throw(TypeError);
    //     });
    // });

    describe('creates an instance from data', () => {
        it('with multiple roots', () => {
            const tree = Tree.fromData([{
                id: 'root1',
                name: 'root node 1'
            }, {
                id: 'root2',
                name: 'root node 2'
            }]);

            tree.children.length.should.be.equal(2);
        });

        it('adds all nodes in hierarchy', () => {
            const tree = Tree.fromData({
                id: 'root',
                name: 'root node',
                children: [{
                    id: 'child',
                    name: 'child node',
                    children: [{
                        id: 'grandchild',
                        name: 'grandchild node'
                    }]
                }]
            });

            tree.children.length.should.be.equals(1);

            const root = tree.children[0];
            root.id.should.be.equal('root');
            root.children.length.should.be.equal(1);

            const childNode = root.children[0];
            childNode.id.should.be.equal('child');
            childNode.name.should.be.equal('child node');
            childNode.children.length.should.be.equal(1);

            const grandchildNode = childNode.children[0];
            grandchildNode.id.should.be.equal('grandchild');
            grandchildNode.name.should.be.equal('grandchild node');
            (grandchildNode.children === undefined).should.be.true;
        });
    });
});
