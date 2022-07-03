import React from 'react';
import './InformationMessage.css';

function InformationMessage({message, className}) {

    return (
        <span className='informationMessage'>{message}</span>
    )
}

export default InformationMessage;