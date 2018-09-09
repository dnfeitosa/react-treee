import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Treee} from '../src/js/index';

import data from './data';
import styles from './styles';
import * as filters from './filter';

import '../src/scss/react-treee.scss';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

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
        console.log(filtered);
        this.setState({data: filtered});
    }

    render() {
        const {data: treeData, cursor} = this.state;

        return (
            <div>
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
                           onSelectNode={this.onSelect.bind(this)}
                           onDeselectNode={this.onDeselect}
                           onOpenNode={this.onOpen}
                           onCloseNode={this.onClose} />
                </div>
                <div style={styles.component}>
                    <NodeViewer node={cursor}/>
                </div>
            </div>
        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
