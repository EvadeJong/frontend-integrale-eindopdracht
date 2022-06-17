import React, {useEffect} from 'react';
import styles from './RequestJoke.module.css'
import Button from "../../components/button/Button";

function RequestJoke(){

    function getPunchlineButton(){
        console.log('You hit the punchline button')
    }

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')
    }, []);

    return(
        <main>
            <div>
                <p>Dit is de RequestJoke pagina</p>
                <Button onClick={getPunchlineButton} text={"I don't know! Why?"} />
            </div>
        </main>

    )
}

export default RequestJoke;