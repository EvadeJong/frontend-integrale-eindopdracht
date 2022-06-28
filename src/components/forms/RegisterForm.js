import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';

import Button from '../button/Button';
import './LoginForm.css'

function RegisterForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);


    async function signUpRequest() {

        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": registerUsername,
                "email": registerEmail,
                "password": registerPassword,
                "roles": [
                    "user"
                ]
            })
            console.log(registerUsername);
            console.log(registerEmail);
            console.log(registerPassword);
            console.log(result);
            if (result.status === 200) {
                console.log('JEEH! GELUKT')
                setIsRequestSuccessful(true);
            }
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.message);
                console.log('The server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).')
            } else if (e.response.status === 401) {
                console.error(e.response.data.message);
            } else {
                console.error(e);
            }
        }
    }

    return (
        <form className='loginForm' onSubmit={handleSubmit(signUpRequest)}>
            <fieldset>
                <legend>
                    <h2>Register</h2>
                </legend>
                {isRequestSuccessful ?
                    <h3>You are registered and can now log in!</h3>
                    :
                    <>
                        <label htmlFor="registerUsername">
                            Username:
                        </label>
                            <input
                                type="text"
                                id="registerUsername"
                                {...register("registerUsername",
                                    {
                                        required: "Username can not be empty",
                                    })
                                }
                                onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                            {errors.registerUsername && <p className='error'>{errors.registerUsername.message}</p>}

                        <label htmlFor="registerEmail">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="registerEmail"
                            {...register("registerEmail",
                                {
                                    required: "E-mail can not be empty",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Enter a valid e-mail address',
                                    },
                                }
                            )}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                        {errors.registerEmail && <p className='error'>{errors.registerEmail.message}</p>}
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
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        {errors.registerPassword && <p className='error'>{errors.registerPassword.message}</p>}
                        <Button type="submit" text="Register"/>
                    </>
                }
            </fieldset>
        </form>
    )
}

export default RegisterForm;