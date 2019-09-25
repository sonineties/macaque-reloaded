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
        this.moveViewLeft = this.moveViewLeft.bind(this);
        this.moveViewRight = this.moveViewRight.bind(this);
        this.getInstance = this.getInstance.bind(this);
    }

    get showingElementView() {
        return (this.state.elemIdx === null) ? false : true;
    }

    showView(idx) {
        this.setState({ elemIdx: idx });
    }

    closeView() {
        this.setState({ elemIdx: null });
    }

    moveViewLeft() {
        if (this.state.elemIdx === undefined)
            return;
        
        const i = this.state.elemIdx;
        const max = this.elementCount;
        const j = (i === 0) ? max : (i - 1);

        this.setState({ elemIdx: j });
    }

    moveViewRight() {
        if (this.state.elemIdx === undefined)
            return;
        
        const i = this.state.elemIdx;
        const max = this.elementCount;
        const j = (i === max) ? 0 : (i + 1);

        this.setState({ elemIdx: j });
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
            runnerId: r.runnerId,
            datasetId: this.props.dataset.name,
            caption: r.captions[this.state.elemIdx]
        } });
        const view = this.showingElementView ? <DataInstanceView 
            dataInstance={this.getInstance()} 
            dataset={this.props.dataset.id}
            results={selectedResults}
            onClick={this.closeView}
            runners={this.props.runners}
            /> : null;

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
                        dataset={this.props.dataset.id}
                        runnerNames={this.props.runners.map(r => r.name)}
                        onServerResponse={this.props.onServerResponse}
                    />
                </div>
            </div>
        );
    }
}

DatasetTab.propTypes = {
    dataset: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        elements: PropTypes.array
    }).isRequired,
    results: PropTypes.array.isRequired,
    onServerResponse: PropTypes.func.isRequired,
    runners: PropTypes.array.isRequired
};

DataInstanceEntry.propTypes = {
    dataInstance: PropTypes.shape({

    }).isRequired,
    handleClick: PropTypes.func.isRequired
};

export { DatasetTab };