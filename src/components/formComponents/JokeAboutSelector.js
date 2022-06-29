import React from "react";

function JokeAboutSelector() {

    const JokeAboutArray = [
        {field: '', value: 'Select...'},
        {field: 'any', value: 'Any'},
        {field: 'programming', value: 'Programming'},
        {field: 'dark', value: 'Dark'},
        {field: 'pun', value: 'Pun'},
        {field: 'spooky', value: 'Spooky'},
        {field: 'christmas', value: 'Christmas'},
        {field: 'misc', value: 'Misc'},
    ]

    return (
        <>
            {
                JokeAboutArray.map(({field, value}) => (
                    <option key={field} value={field}>
                        {value}
                    </option>
                ))}
        </>
    )
}

export default JokeAboutSelector;