import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({message, className}) {

    return (
        <span className={className}>{message}</span>
    )
}

export default ErrorMessage;