import React, {useEffect} from 'react';
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";

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
        </>
    )
}

export default SubmitJoke;