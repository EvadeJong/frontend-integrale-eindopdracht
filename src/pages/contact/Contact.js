import React, {useEffect}  from 'react';
import styles from './Contact.css';
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


function Contact(){

    function submitButton(){
        console.log('Form is submitted')
    }

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#FFAD30');
    }, []);

    return(
        <>
            <Header />
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        <p>Dit is de contact pagina</p>
                        <Button onClick={submitButton} text={'Submit'} />
                    </div>
                </section>
            </main>
            <Footer text='Something amazing is about to happen'/>
        </>
    )
}

export default Contact;