import React, {useEffect} from 'react';

function SubmitJoke(){

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#E67A3D')
    }, []);

    return(
        <p>Dit is de SubmitJoke pagina</p>
    )
}

export default SubmitJoke;