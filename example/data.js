'use strict';

export default {
    id: 'react-treebeard',
    name: 'react-treebeard',
    toggled: true,
    active: false,
    type: 'folder',
    children: [
        {
            name: 'example',
            type: 'folder',
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
            type: 'folder',
            loading: true,
            children: true
        },
        {
            name: 'src',
            type: 'folder',
            children: [
                {
                    name: 'components',
                    type: 'folder',
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
            type: 'folder',
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
