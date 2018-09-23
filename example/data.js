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
                { icon: 'file-text', name: 'app.js' },
                { icon: 'file-text', name: 'data.js' },
                { icon: 'file-text', name: 'index.html' },
                { icon: 'file-text', name: 'styles.js' },
                { icon: 'file-text', name: 'webpack.config.js' }
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
                        { icon: 'file-text', name: 'decorators.js' },
                        { icon: 'file-text', name: 'tree.js' }
                    ]
                },
                { icon: 'file-text', name: 'index.js' }
            ]
        },
        {
            name: 'themes',
            icon: 'folder',
            children: [
                { icon: 'file-text', name: 'animations.js' },
                { icon: 'file-text', name: 'default.js' }
            ]
        },
        { icon: 'file-text', name: 'Gulpfile.js' },
        { icon: 'file-text', name: 'index.js' },
        { icon: 'file-text', name: 'package.json' }
    ]
};
