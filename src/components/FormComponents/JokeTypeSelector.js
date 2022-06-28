import React from "react";

function JokeTypeSelector(){

    const JokeTypeArray = [
        {field: '', value:'Select...'},
        {field: 'single', value: 'Single part'},
        {field: 'twopart', value: 'Two part'},
    ]

    return(
        <>
            {
                JokeTypeArray.map(({field, value}) => (
                    <option key={field} value={field}>
                        {value}
                    </option>
                ))}
        </>
    )
}

export default JokeTypeSelector;