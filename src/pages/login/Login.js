import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import Button from '../../components/button/Button'

function Login({login, getter, setter}){

    const history = useHistory();
    function loginButton(){
        setter(!getter);
        console.log({login})
    }

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')
    }, []);

    return(
        <>
            <div>Dit is de login pagina</div>
            <h2>{login === true ? "Je bent ingelogd" : "Je bent nog niet ingelogd"}</h2>

            <Button onClick={loginButton} text={'Login'} />
        </>
    )
}

export default Login;