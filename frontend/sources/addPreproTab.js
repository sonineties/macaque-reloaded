import React from 'react';
import PropTypes from 'prop-types';

import { InformativeInput, InformativeLabel } from './utils.js';
import { AddSomethingTab } from './addSomethingTab.js';
import { PendingTab, ErrorTab, SuccessTab } from './statusTabs.js';

export { AddPreproTab };


/**
 * This class represents the input form for adding a preprocessor.
 * 
 * Its state consists merely of the user defined configuration
 * of the preprocessor along with error logs returned by the
 * server.
 * 
 * Component State:
 *      name: String. Name of the preprocessor.
 *      targetWidth: String. The target width of the image in pixels
 *              after preprocessing.
 *      targetHeight: String. The target height of the image in pixels
 *              after preprocessing.
 *      mode: String. String identifier of the type of preprocessing to apply.
 *      errorLog: Object. Holds error messages returned from the server.
 * 
 * Component Props:
 *      addPrepro: Function. Registers the new preprocessor in the central
 *              application state.
 */
class AddPreproTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "prepro_1",
            targetWidth: "224",
            targetHeight: "224",
            mode: "1",
            errorLog: {}
        };
        this.addPrepro = this.addPrepro.bind(this);
    }

    addPrepro() {
        const preproCfg = this.state;
        this.setState({ status: "waiting" });

        fetch('/add_prepro', {
            method: 'POST',
            body: JSON.stringify(preproCfg),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json() )
        .then(res => {
            if (res.id === undefined) {
                this.setState({ status: "error", errorLog: res.log });
            } else {
                this.setState({ status: "ok", errorLog: {} });
                this.props.addPrepro(preproCfg);
            }
        })
        .catch(error => console.log('Error:', error));
    }

    render() {
        let statusTab = null;
        if (this.state.status === "waiting") {
            statusTab = <PendingTab text="Processing"/>;
        } else if (this.state.status === "error") {
            statusTab = <ErrorTab text="Error"/>;
        } else if (this.state.status === "ok") {
            statusTab = <SuccessTab text="Preprocessor successfully created."/>;
        }

        return (
            <AddSomethingTab>
            <div>
                <div className="addModelPartLabel">Preprocessor</div>
                <InformativeInput name="name" value={this.state.name} 
                    optional={false}
                    hint="The name of the preprocessor. Unique among preprocessors."
                    error={this.state.errorLog.name}
                    handleChange={(e) => { this.setState({ name: e.target.value }); }}
                />
                <InformativeInput name="target width" value={this.state.targetWidth} 
                    optional={false}
                    hint="The target width of images after preprocessing."
                    error={this.state.errorLog.width}
                    handleChange={(e) => { this.setState({ targetWidth: e.target.value }); }}
                />
                <InformativeInput name="target height" value={this.state.targetHeight} 
                    optional={false}
                    hint="The target height of images after preprocessing."
                    error={this.state.errorLog.height}
                    handleChange={(e) => { this.setState({ targetHeight: e.target.value }); }}
                />
                <InformativeLabel
                    name="mode"
                    optional={false}
                    hint="The mode of preprocessing.">
                    <select value={this.state.mode} 
                        onChange={(e) => { this.setState({ mode: e.target.value }); }}>
                            <option value="1" >keep aspect ratio and crop</option>
                            <option value="2" >keep aspect ration and pad</option>
                            <option value="3" >rescale width and rescale height</option>
                            <option value="4" >rescale width and crop/pad height</option>
                            <option value="5" >rescale height and crop/pad width</option>
                    </select>
                </InformativeLabel>

                <button onClick={this.addPrepro}>Add preprocessor</button>
                {statusTab}
            </div>
            </AddSomethingTab>
        );
    }
}

AddPreproTab.propTypes = {
    addPrepro: PropTypes.func.isRequired,
};
