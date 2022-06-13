import React, {useEffect} from 'react';
import styles from './RequestJoke.module.css'

function RequestJoke(){

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')
    }, []);

    return(
        <p>Dit is de RequestJoke pagina</p>
    )
}

export default RequestJoke;