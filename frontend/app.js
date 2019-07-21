import ReactDOM from 'react-dom';
import React from 'react';

import { AboutTab } from './aboutTab.js';
import { AddDatasetTab } from './addDatasetTab.js';
import { AddMetricTab } from './addMetricTab.js';
import { AddModelTab } from './addModelTab.js';
import { DatasetTab } from './datasetTab.js';
import { ModelTab } from './modelTab.js';
import { Navigation } from './nav.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        this.handleSelectedTabChange = this.handleSelectedTabChange.bind(this);
    }

    handleSelectedTabChange(tabKey) {
        this.setState({ selectedTab: tabKey });
    }

    idToTab(id) {
        const s = this.state;
        const models = s.models.map(m => m.name);
        const datasets = s.datasets.map(d => d.name);
        const defaults = s.defaultTabs;

        if (defaults[id])
            return defaults[id];
        
        if (models.include(id)) {
            const m = s.models.filter(m => m.name === id)[0];
            return <ModelTab model={m} />
        }
        if (datasets.include(id)) {
            const d = s.datasets.filter(d => d.name === id)[0];
            return <DatasetTab dataset={d} />
        }

        return null;
    }

    render() {
        const s = this.state;
        const ms = s.models.map(m => m.name);
        const ds = s.datasets.map(d => d.name);
        const defaults = Object.keys(s.defaultTabs);

        return (
            <div>
                <Navigation
                    datasetNames={ds} 
                    modelNames={ms} 
                    defaultNames={defaults}
                    onSelectedChange={this.handleSelectedTabChange}
                />
                <hr/>
                {this.idToTab(this.state.selectedTab)}
            </div>
        );
    }

}

let state = {
    models: [],
    datasets: [],
    metrics: [],
    defaultTabs: {
        "About": <AboutTab />,
        "Add Dataset": <AddDatasetTab />,
        "Add Metric": <AddMetricTab />,
        "Add Model": <AddModelTab />
    },
    selectedTab: "About",
}

ReactDOM.render(
    <App state={state} />,
    document.getElementById('root')
);