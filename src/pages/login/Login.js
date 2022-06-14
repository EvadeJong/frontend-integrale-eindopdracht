import React, {useEffect} from 'react';
import styles from './Login.module.css';
import Button from '../../components/button/Button'

function Login({login, getter, setter}){


    function loginButton(){
        setter(!getter);
        console.log({login})
    }

    function registerButton(){
        console.log('Je bent geregistreerd')
    }
    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')
    }, []);

    return(
        <main>
            <span>
                <div>
                    <h1>Dit is de login pagina</h1>
                    <h2>{login === true ? "Je bent ingelogd" : "Je bent nog niet ingelogd"}</h2>
                    <Button onClick={loginButton} text={'Login'} />
                </div>
            </span>
            <span>
                <div>
                    <h1>Dit is de register pagina</h1>
                    <Button onClick={registerButton} text={'Register'} />
                </div>
            </span>

        </main>
    )
}

export default Login;