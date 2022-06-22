import React, {useEffect} from 'react';
import styles from './RequestJoke.css'
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";

function RequestJoke(){

    function getPunchlineButton(){
        console.log('You hit the punchline button')
    }

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')
    }, []);

    return(
        <>
            <Header />
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        <p>Dit is de RequestJoke pagina</p>
                        <Button onClick={getPunchlineButton} text={"I don't know! Why?"} />
                    </div>
                </section>
            </main>
        </>
    )
}

export default RequestJoke;