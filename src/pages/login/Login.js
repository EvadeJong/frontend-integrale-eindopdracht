import React, {useContext, useEffect} from 'react';
import styles from './Login.module.css';
import Button from '../../components/button/Button'
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import LoginForm from "../../components/forms/LoginForm";

function Login() {

    const {login} = useContext(AuthContext);

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')
    }, []);

    async function signUpRequest() {
        try{
            const result = await axios.post(' https://frontend-educational-backend.herokuapp.com/api/auth/signup', {

                "username": "Eva",
                "email" : "Eva@novi.nl",
                "password" : "123456",
            }
            )
            login(result.data.accessToken);
        } catch(e){
            console.error(e);
        }

    }


        return (
            <main>
            <span>
                <div>
                    <h1>Dit is de login pagina</h1>
                    <LoginForm />

                </div>
            </span>
                <span>
                <div>
                    <h1>Dit is de register pagina</h1>
                    <Button type="submit" text="Register" onClick={signUpRequest}/>
                </div>
            </span>
            </main>
        )
    }

export default Login;