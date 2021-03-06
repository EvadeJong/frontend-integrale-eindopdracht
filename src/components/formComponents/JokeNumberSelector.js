//React imports
import React from 'react';

//CSS imports
import './Selectors.css';

function JokeNumberSelector() {

    const JokeNumberArray = [
        {field: '', value: 'Select...'},
        {field: '1', value: 'One good laugh!'},
        {field: '3', value: 'A couple laughs!'},
        {field: '5', value: 'A lot, wanna ROFL!'},
    ]

    return (
        <>
            {
                JokeNumberArray.map(({field, value}) => (
                    <option key={field} value={field}>
                        {value}
                    </option>
                ))}
        </>
    )
}

export default JokeNumberSelector;