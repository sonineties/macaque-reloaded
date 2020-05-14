import React from 'react';

export { ModelsTab };


function ModelsTab(props) {
    const ms = props.models;

    if (ms.length === 0)
        return (
            <div className="aboutTab">
                <div>
                    <p>No model information currently available.</p>
                </div>
            </div>
        );

    let elems = [];
    for (let i = 0; i < ms.length; i++) {
        elems.push(<h3>{ms[i].name}</h3>);
        elems.push(<br/>);
        for (let j = 0; j < ms[i].about.length; j++) {
            elems.push(<p>{ms[i].about[j]}</p>);
            elems.push(<br/>);
        }
    }

    return (
        <div className="aboutTab">
            <div>
                {elems}
            </div>
        </div>
    );
}