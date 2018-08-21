import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
import {Treee, decorators} from '../src/index';

import data from './data';
import styles from './styles';
import * as filters from './filter';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

// Example: Customising The Header Decorator To Include Icons
decorators.Header = ({style, node, onClick}) => {
    const iconType = node.type === 'folder' ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = {marginRight: '5px'};

    return (
        <div style={style.base}>
            <div style={style.title} onClick={onClick}>
                <i className={iconClass} style={iconStyle}/>

                {node.name}
            </div>
        </div>
    );
};

decorators.Header.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    node: PropTypes.object.isRequired
};

class NodeViewer extends React.Component {
    render() {
        const style = styles.viewer;

        /* prevents circular references error */
        const replacer = (key, value) => {
            return key === 'parent' ? `[${value.name}]` : value;
        };

        let json = JSON.stringify(this.props.node, replacer, 4);
        if (!json) {
            json = HELP_MSG;
        }

        return <div style={style.base}>{json}</div>;
    }
}
NodeViewer.propTypes = {
    node: PropTypes.object
};

class DemoTree extends React.Component {
    constructor() {
        super();

        this.state = {data};
    }

    onSelect(node) {
        console.log('select', node);
        this.setState({cursor: node});
    }

    onDeselect(node) {
        console.log('deselect', node);
    }

    onClose(node) {
        console.log('close', node);
    }

    onOpen(node) {
        console.log('open', node);
    }

    onFilterMouseUp(e) {
        const filter = e.target.value.trim();
        if (!filter) {
            return this.setState({data});
        }
        var filtered = filters.filterTree(data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({data: filtered});
    }

    render() {
        const {data: treeData, cursor} = this.state;

        return (
            <StyleRoot>
                <div style={styles.searchBox}>
                    <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-search"/>
                        </span>
                        <input className="form-control"
                               onKeyUp={this.onFilterMouseUp.bind(this)}
                               placeholder="Search the tree..."
                               type="text"/>
                    </div>
                </div>
                <div style={styles.component}>
                    <Treee data={treeData}
                           decorators={decorators}
                           onSelectNode={this.onSelect.bind(this)}
                           onDeselectNode={this.onDeselect}
                           onOpenNode={this.onOpen}
                           onCloseNode={this.onClose} />
                </div>
                <div style={styles.component}>
                    <NodeViewer node={cursor}/>
                </div>
            </StyleRoot>
        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
