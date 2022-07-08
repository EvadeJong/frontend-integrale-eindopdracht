//React imports
import React, {useEffect} from 'react';

//Component imports
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ContactForm from '../../components/forms/contact/ContactForm';

function Contact() {

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#FFAD30');
    }, []);

    return (
        <>
            <Header/>
            <main>
                <section className='pageOuterContainer'>
                    <div className='pageInnerContainer'>
                        <ContactForm/>
                    </div>
                </section>
            </main>
            <Footer text='Something amazing is about to happen'/>
        </>
    )
}

export default Contact;