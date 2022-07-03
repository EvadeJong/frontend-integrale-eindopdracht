import React, {useEffect} from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SubmitJokeForm from "../../components/forms/submitJoke/SubmitJokeForm";

function SubmitJoke() {

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#E67A3D')
    }, []);

    return (
        <>
            <Header/>
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">

                        <h1>'So you think you are funny?'</h1>
                        <SubmitJokeForm/>
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default SubmitJoke;