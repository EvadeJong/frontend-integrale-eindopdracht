import React from 'react';
import { useHistory } from 'react-router-dom'

function Login({login, getter, setter}){

    const history = useHistory();
    function loginButton(){
        setter(!getter);
        console.log({login})
    }

    return(
        <>
            <div>Dit is de login pagina</div>
            <h2>{login === true ? "Je bent ingelogd" : "Je bent nog niet ingelogd"}</h2>
            <button type="button" onClick={loginButton}>Login</button>
        </>
    )
}

export default Login;