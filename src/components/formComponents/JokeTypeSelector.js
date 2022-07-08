//React imports
import React from 'react';

//CSS imports
import './Selectors.css';

function JokeTypeSelector() {

    const JokeTypeArray = [
        {field: '', value: 'Select...'},
        {field: 'single', value: 'Single part'},
        {field: 'twopart', value: 'Two parts'},
    ]

    return (
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