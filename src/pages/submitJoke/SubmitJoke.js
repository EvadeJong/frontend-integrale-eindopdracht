import React, {useEffect} from 'react';
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function SubmitJoke(){

    function submitJokeButton(){
        console.log('You submitted a joke')
    }

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#E67A3D')
    }, []);

    return(
        <>
            <Header />
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        <p>Dit is de SubmitJoke pagina</p>
                        <Button onClick={submitJokeButton} text={"Submit joke"} />
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default SubmitJoke;