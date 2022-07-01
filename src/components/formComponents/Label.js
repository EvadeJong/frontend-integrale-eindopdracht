import React from "react";
import './Label.css';


function Label({htmlFor, labelText}) {
    return (
        <label htmlFor={htmlFor}>
            {labelText}
        </label>
    )
}

export default Label;