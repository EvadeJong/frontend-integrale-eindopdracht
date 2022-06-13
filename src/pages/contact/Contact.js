import React, {useEffect}  from 'react';
import styles from './Contact.module.css';


function Contact(){

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#FFAD30');
    }, []);

    return(
        <p>Dit is de contact pagina</p>
    )
}

export default Contact;