import React, {useEffect} from 'react';
import Button from "../../components/button/Button";

function SubmitJoke(){

    function submitJokeButton(){
        console.log('You submitted a joke')
    }

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#E67A3D')
    }, []);

    return(
        <main>
            <div>
                <p>Dit is de SubmitJoke pagina</p>
                <Button onClick={submitJokeButton} text={"Submit joke"} />
            </div>
        </main>
    )
}

export default SubmitJoke;