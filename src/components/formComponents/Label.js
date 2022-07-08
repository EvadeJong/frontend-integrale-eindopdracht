//React imports
import React from 'react';

//CSS imports
import './Label.css';

function Label({htmlFor, labelText}) {
    return (
        <label htmlFor={htmlFor}>
            {labelText}
        </label>
    )
}

export default Label;