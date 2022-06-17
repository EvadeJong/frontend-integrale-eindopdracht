import React, {useEffect}  from 'react';
import styles from './Contact.module.css';
import Button from "../../components/button/Button";


function Contact(){

    function submitButton(){
        console.log('Form is submitted')
    }

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#FFAD30');
    }, []);

    return(
        <main>
            <div>
                <p>Dit is de contact pagina</p>
                <Button onClick={submitButton} text={'Submit'} />
            </div>
        </main>
    )
}

export default Contact;