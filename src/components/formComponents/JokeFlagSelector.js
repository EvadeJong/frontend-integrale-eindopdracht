//React imports
import React from 'react';

//CSS imports
import './Selectors.css';

function JokeFlagSelector() {

    const JokeIsArray = [
        {field: '', value: 'Select...'},
        {field: 'nsfw', value: 'Nsfw'},
        {field: 'religious', value: 'Religious'},
        {field: 'political', value: 'Political'},
        {field: 'racist', value: 'Racist'},
        {field: 'sexist', value: 'Sexist'},
        {field: 'explicit', value: 'Explicit'},
    ]

    return (
        <>
            {
                JokeIsArray.map(({field, value}) => (
                    <option key={field} value={field}>
                        {value}
                    </option>
                ))}
        </>
    )
}

export default JokeFlagSelector;