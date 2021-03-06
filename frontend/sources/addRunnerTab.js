import React from 'react';
import PropTypes from 'prop-types';

import { AddSomethingTab } from './addSomethingTab.js';
import { SuccessTab, ErrorTab, PendingTab } from './statusTabs.js';
import { InformativeInput, InformativeLabel } from './utils.js';

export { AddRunnerTab };


/**
 * This class represents the input form for adding a runner.
 * 
 * Its state merely holds information about the name, preprocessor,
 * encoder and model, used in the runner along with error logs
 * returned by the server.
 * 
 * Component State:
 *      name: String. Name of the runner.
 *      prepro: Number. Id of the selected preprocessor.
 *      encoder: Number. Id of the selected encoder.
 *      model: Number. Id of the selected model.
 *      errorLog: Object. Holds error messages from the server.
 * 
 * Component Props:
 *      preprocessors: Array. Array of preprocessor names.
 *      encoders: Array. Array of encoder names.
 *      models: Array. Array of model names.
 *      addRunner: Function. Registers the new runner in the central state.
 */
class AddRunnerTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "runner_1",
            prepro: null,
            encoder: null,
            model: null,
            errorLog: {}
        };
        this.addRunner = this.addRunner.bind(this);
    }

    addRunner() {
        const runnerCfg = this.state;
        this.setState({ status: "waiting" });

        fetch('/add_runner', {
            method: 'POST',
            body: JSON.stringify(runnerCfg),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            if (res.id === undefined) {
                this.setState({ 
                    status: "error", 
                    errorLog: res.log
                });
            } else {
                this.setState({ 
                    status: "ok",
                    errorLog: {}
                });
                this.props.addRunner(runnerCfg);
            }
        })
        .catch(error => console.log('Error:', error));
    }

    render() {
        const p = this.props;
        const s = this.state;

        const ps = p.preprocessors.map(p => p.name);
        const es = p.encoders.map(e => e.name);
        const ms = p.models.map(m => m.name);

        const setPrepro = e => {
            this.setState({
                prepro: e.target.value === "none" ? null : ps.indexOf(e.target.value)
            });
        };
        const setEncoder = e => {
            this.setState({
                encoder: e.target.value === "none" ? null : es.indexOf(e.target.value)
            });
        };
        const setModel = e => {
            this.setState({
                model: e.target.value === "none" ? null : ms.indexOf(e.target.value)
            });
        };

        let statusTab = null;
        if (s.status === "ok") {
            statusTab = <SuccessTab text="Runner successfully created."/>;
        } else if (s.status === "error") {
            statusTab = <ErrorTab text="Error."/>;
        } else if (s.status === "waiting") {
            statusTab = <PendingTab text="Processing."/>;
        }

        return (
            <AddSomethingTab>
            <div>
                <div className="addModelPartLabel">Runner</div>
                
                <InformativeInput
                    name="name"
                    value={s.name}
                    optional={false}
                    handleChange={e => this.setState({ name: e.target.value })}
                    hint="The unique name of the runner."
                    error={s.errorLog.name}
                />

                <InformativeLabel
                    name="preprocessor"
                    hint="The preprocessor to be used with this runner."
                    optional={false}>
                    <select value={s.prepro === null ? "none" : ps[s.prepro]} onChange={setPrepro}>
                        <option value='none'>none</option>
                        { ps.map(p => <option value={p} key={p}>{p}</option>) }
                    </select>    
                </InformativeLabel>

                <InformativeLabel name="encoder"
                    hint="The encoder to be used with this runner."
                    optional={false}>
                    <select value={s.encoder === null ? "none" : es[s.encoder]} onChange={setEncoder}>
                        <option value='none'>none</option>
                        { es.map(e => <option value={e} key={e}>{e}</option>) }
                    </select>
                </InformativeLabel>

                <InformativeLabel
                    name="model"
                    hint="The model to be used with this runner."
                    optional={false}>
                    <select value={s.model === null ? "none" : ms[s.model]} onChange={setModel}>
                        <option value='none'>none</option>
                        { ms.map(m => <option value={m} key={m}>{m}</option>) }
                    </select>
                </InformativeLabel>

                <button onClick={this.addRunner}>Add run configuration</button>
                
                {statusTab}
            </div>
            </AddSomethingTab>
        );
    }
}

AddRunnerTab.propTypes = {
    preprocessors: PropTypes.array.isRequired,
    encoders: PropTypes.array.isRequired,
    models: PropTypes.array.isRequired,
    addRunner: PropTypes.func.isRequired
};