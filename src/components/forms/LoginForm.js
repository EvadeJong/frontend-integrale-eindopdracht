import React, {useContext, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";
import './LoginForm.css'

function LoginForm(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        });
    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function signInRequest() {
        try{
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',
                {
                    'username': username,
                    'password': password,
                }
            )
            console.log(result.data.accessToken);
            login(result.data.accessToken);
        } catch(e){
            console.error(e);
        }
    }

    return(
        <form className='loginForm' onSubmit={handleSubmit(signInRequest)}>
            <fieldset>
                <legend>
                    <h2>Login</h2>
                </legend>
                <label htmlFor='username'>
                    Username:
                <input
                    type='text'
                    id='username'
                    {...register('username',
                        {
                            required: 'Username can not be empty',
                        })
                    }
                    onChange={(e) => setUsername(e.target.value)}
                />
                    {errors.username && <p className='error'>{errors.username.message}</p>}
                </label>

                <label htmlFor='password'>
                    Password:
                    <input
                        type='password'
                        id='password'
                        {...register('password',
                            {
                                required: 'Password can not be empty',
                                minLength: {
                                    value: 5,
                                    message: 'Email must be at least 5 characters'
                                }
                            }
                        )}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                </label>

                <Button type='submit' text= 'Login'/>
            </fieldset>
        </form>
    )
}

export default LoginForm;