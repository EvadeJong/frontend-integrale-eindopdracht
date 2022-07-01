import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import Button from "../../button/Button";
import './LoginForm.css'
import ErrorMessage from "../../errorMessage/ErrorMessage";

function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',
    });
    const {login} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, toggleLoading] = useState(false);

    async function signInRequest() {
        toggleLoading(true);

        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',
                {
                    'username': username,
                    'password': password,
                }
            )
            console.log(result.data.accessToken);
            login(result.data.accessToken);
        }
        catch (e) {
            setIsError(true);

            switch (e.response.status) {
                case 400:
                    setErrorMessage
                    ('The request is formatted incorrectly and cannot be processed.')
                    break;
                case 401:
                    setErrorMessage
                    ('You are not correctly authenticated, have you entered the correct credentials?');
                    break;
                case 403:
                    setErrorMessage
                    ('You are not authorized.');
                    break;
                case 404:
                    setErrorMessage
                    ('The server can not find the requested resource, the URL is not recognized.');
                    break;
                case 500:
                    setErrorMessage
                    ('The server has encountered a situation it does not know how to handle.');
                    break;
                case 503:
                    setErrorMessage
                    ('Service unavailable. The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.');
                    break;
                default:
                    setErrorMessage(e.response.status, e.response.data);
            }
        }

        toggleLoading(false);
    }

    return (
        <>
            <form className='loginForm' onSubmit={handleSubmit(signInRequest)}>
                <fieldset>
                    <legend>
                        <h2>Login</h2>
                    </legend>
                    {loading &&
                        <ErrorMessage className='fieldLoadingMessage' message='Loading...' />
                    }
                    {isError ?
                        <span>
                            <ErrorMessage className={'errorMessage'} message={errorMessage}/>
                            <Button type='submit' text='I want to try again' onClick={() => setIsError(false)}/>
                        </span>
                        :
                        <span>
                            <label htmlFor='username'>
                                Username:
                            </label>
                            <input
                                type='text'
                                id='username'
                                {...register('username',
                                    {
                                        required: 'You must specify a username',
                                    })
                                }
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username &&
                                <ErrorMessage className={'fieldErrorMessage'} message={errors.username.message}/>}
                            <label htmlFor='password'>
                                Password:
                            </label>
                            <input
                                type='password'
                                id='password'
                                {...register('password',
                                    {
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }
                                    }
                                )}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password &&
                                <ErrorMessage className={'fieldErrorMessage'} message={errors.password.message}/>}
                            <Button type='submit' text='Login'/>
                        </span>
                    }
                </fieldset>
            </form>

        </>
    )
}

export default LoginForm;