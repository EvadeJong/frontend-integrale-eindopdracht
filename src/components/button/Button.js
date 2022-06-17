import React from 'react';
import styles from './Button.module.css';

function Button ({type, onClick, text}){

    return(
        <button className={styles.button} type={type} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;
