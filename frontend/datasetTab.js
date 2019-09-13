import PropTypes from 'prop-types';
import React from 'react';

import { DataInstanceView } from './dataInstanceView.js';
import { DatasetMenu } from './datasetMenu.js';
import { TableRow } from './utils.js';

import './style.css';


class DataInstanceEntry extends React.Component {
    
    render() {
        let entries = [this.props.dataInstance.source]
        
        return (
            <div onClick={this.props.handleClick}>
                <TableRow entries={entries}/>
            </div>
        );
    }
}

class DatasetTab extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            elemIdx: null
        };

        this.showView = this.showView.bind(this);
        this.closeView = this.closeView.bind(this);
        this.getInstance = this.getInstance.bind(this);
    }

    showView(idx) {
        this.setState({ elemIdx: idx });
    }

    closeView() {
        this.setState({ elemIdx: null });
    }

    getInstance() {
        let x = this.props.dataset.elements[this.state.elemIdx];
        console.log(x); 
        return x;
    }

    render() {
        console.log(this.props.results);
        const selectedResults = this.props.results.map(r => { return { 
            runId: r.runId, 
            modelId: r.modelId,
            datasetId: this.props.dataset.name,
            caption: r.captions[this.state.elemIdx]
        } });
        const view = this.showingElementView ? <DataInstanceView 
            dataInstance={this.getInstance()} 
            dataset={this.props.dataset.name}
            results={selectedResults}
            onClick={this.closeView}/> : null;

        let elems = this.props.dataset.elements;
        elems = elems.map(e => <DataInstanceEntry key={e.id} dataInstance={e} handleClick={() => this.showView(e.id)}/>);

        return (
            <div style={{display: "table"}}>
                <div style={{display: "table-cell"}}>
                    {elems}
                    {view}
                </div>
                <div style={{display: "table-cell"}}>
                    <DatasetMenu 
                        datasetName={this.props.dataset.name}
                        modelNames={this.props.modelNames}
                        onServerResponse={this.props.onServerResponse}
                    />
                </div>
            </div>
        );
    }
}

DatasetTab.propTypes = {
    dataset: PropTypes.shape({
        name: PropTypes.string,
        elements: PropTypes.array
    }).isRequired,
    modelNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    results: PropTypes.array.isRequired,
    onServerResponse: PropTypes.func.isRequired
};

DataInstanceEntry.propTypes = {
    dataInstance: PropTypes.shape({

    }).isRequired,
    handleClick: PropTypes.func.isRequired
};

export { DatasetTab };