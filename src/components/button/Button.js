import React from 'react';
import './Button.css';

function Button({type, onClick, text, disabled}) {

    return (
        <button className="button" type={type} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default Button;
