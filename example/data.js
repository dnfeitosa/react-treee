export default {
    id: 'react-treebeard',
    name: 'react-treebeard',
    toggled: true,
    active: false,
    icon: 'folder',
    children: [
        {
            name: 'example',
            icon: 'folder',
            children: [
                { name: 'app.js' },
                { name: 'data.js' },
                { name: 'index.html' },
                { name: 'styles.js' },
                { name: 'webpack.config.js' }
            ]
        },
        {
            name: 'node_modules',
            icon: 'folder',
            loading: true,
            children: true
        },
        {
            name: 'src',
            icon: 'folder',
            children: [
                {
                    name: 'components',
                    icon: 'folder',
                    children: [
                        { name: 'decorators.js' },
                        { name: 'tree.js' }
                    ]
                },
                { name: 'index.js' }
            ]
        },
        {
            name: 'themes',
            icon: 'folder',
            children: [
                { name: 'animations.js' },
                { name: 'default.js' }
            ]
        },
        { name: 'Gulpfile.js' },
        { name: 'index.js' },
        { name: 'package.json' }
    ]
};
