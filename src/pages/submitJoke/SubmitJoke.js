import React, {useEffect, useContext} from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SubmitJokeForm from "../../components/forms/submitJoke/SubmitJokeForm";
import {AuthContext} from "../../context/AuthContext";

function SubmitJoke() {
    const {user: {username}} = useContext(AuthContext);

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#FFAD30')
    }, []);

    return (
        <>
            <Header/>
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        <h1 className='jokerHeadline'>Tell us your joke {username}</h1>
                        <SubmitJokeForm />
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default SubmitJoke;