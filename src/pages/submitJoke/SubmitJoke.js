//React imports
import React, {useContext, useEffect} from 'react';

//CSS imports
import './SubmitJoke.css'

//Context imports
import {AuthContext} from '../../context/AuthContext';

//Component imports
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SubmitJokeForm from '../../components/forms/submitJoke/SubmitJokeForm';

function SubmitJoke() {
    const {user: {username}} = useContext(AuthContext);

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#FFAD30')
    }, []);

    return (
        <>
            <Header/>
            <main>
                <section className='pageOuterContainer'>
                    <div className='pageInnerContainer'>
                        <h1 className='jokerHeadline'>Tell us your joke {username}</h1>
                        <SubmitJokeForm/>
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default SubmitJoke;