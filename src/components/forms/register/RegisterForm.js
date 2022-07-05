import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';

import Button from '../../button/Button';
import './RegisterForm.css'
import ErrorMessage from "../../errorMessage/ErrorMessage";
import Label from "../../formComponents/Label";
import {useHistory} from "react-router-dom";

function RegisterForm() {

    const controller = new AbortController();

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',
    });

    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, toggleLoading] = useState(false);

    const history = useHistory();

    useEffect(()=>{
        return history.listen((location) => {
            console.log(`You changed the page to: ${location.pathname}`)
        })

        return function cleanup(){
            controller.abort();
        }
    },[history]);

    async function signUpRequest(data) {
        toggleLoading(true);

        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": data.registerUsername,
                "email": data.registerEmail,
                "password": data.registerPassword,
                "roles": [
                    "user"
                ]
            })

            if (result.status === 200) {
                setIsRequestSuccessful(true);
            }
        }
        catch (e) {
            setIsError(true);

            switch (e.response.status) {
                case 400:
                    setErrorMessage
                    ('The username or email is already in use. If you already have an account, please log in.')
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
        <form className='registerForm' onSubmit={handleSubmit(signUpRequest)}>
            <fieldset>
                <legend>
                    <h2>Register</h2>
                </legend>
                {loading &&
                    <ErrorMessage className='fieldLoadingMessage' message='Loading...' />
                }
                {isError &&
                    <div>
                        <ErrorMessage className={'errorMessage'} message={errorMessage}/>
                        <Button type='submit' text='I want to try again' onClick={() => setIsError(false)}/>
                    </div>
                }
                {isRequestSuccessful &&
                    <h3>You are registered and can now log in!</h3>
                }
                {!isError && !isRequestSuccessful &&
                    <>
                        <Label htmlFor="registerUsername" labelText='Username:' />
                        <input
                            type="text"
                            id="registerUsername"
                            {...register("registerUsername",
                                {
                                    required: "You must specify a username",
                                })
                            }
                        />
                        {errors.registerUsername &&
                            <ErrorMessage
                                className={'fieldErrorMessage'}
                                message={errors.registerUsername.message}
                            />
                        }

                        <label htmlFor="registerEmail">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="registerEmail"
                            {...register("registerEmail",
                                {
                                    required: "You must specify an email address",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Enter a valid e-mail address',
                                    },
                                }
                            )}
                        />
                        {errors.registerEmail &&
                            <ErrorMessage
                                className={'fieldErrorMessage'}
                                message={errors.registerEmail.message}
                            />
                        }
                        <label htmlFor="register-password">
                            Password:
                        </label>
                        <input
                            type='password'
                            id='registerPassword'
                            {...register('registerPassword',
                                {
                                    required: "You must specify a password",
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    }
                                }
                            )}
                        />
                        {errors.registerPassword &&
                            <ErrorMessage
                                className={'fieldErrorMessage'}
                                message={errors.registerPassword.message}
                            />
                        }
                        <Button type="submit" text="Register"/>
                    </>
                }
            </fieldset>
        </form>
    )
}

export default RegisterForm;