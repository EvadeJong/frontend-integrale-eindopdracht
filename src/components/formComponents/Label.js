import React from "react";


function Label({htmlFor, labelText}) {
    return (
        <label htmlFor={htmlFor}>
            {labelText}
        </label>
    )
}

export default Label;