//React imports
import React from 'react';

//CSS imports
import './ErrorMessage.css';

function ErrorMessage({message, className}) {

    return (
        <span className={className}>{message}</span>
    )
}

export default ErrorMessage;