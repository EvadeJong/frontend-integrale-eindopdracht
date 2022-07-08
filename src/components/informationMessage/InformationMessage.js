//React imports
import React from 'react';

//CSS imports
import './InformationMessage.css';

function InformationMessage({message}) {

    return (

        <span className='informationMessage'>{message}</span>
    )
}

export default InformationMessage;