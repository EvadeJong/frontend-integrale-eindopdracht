import React, {useContext, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";
import './Form.css'

function RegisterForm(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            email: ""
        }});
    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    async function signUpRequest() {
       try {
          const result = await axios.post(' https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
             "username": username,
             "email": email,
             "password": registerPassword,
          })

           login(result.data.accessToken);
       } catch (e) {
              console.error(e);
       }}

    return(
        <form onSubmit={handleSubmit(signUpRequest)}>
            <fieldset>
                <legend>
                    <h2>Register now</h2>
                </legend>
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        id="username"
                        {...register("username",
                            {
                                required: "Username can not be empty",
                            })
                        }
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className='error'>{errors.username.message}</p>}
                </label>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        id="email"
                        {...register("email",
                            {
                                required: "E-mail can not be empty",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Enter a valid e-mail address',
                                },
                            }
                        )}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                </label>
                <label htmlFor="register-password">
                    Password:
                    <input
                        type="password"
                        id="register-password"
                        {...register("register-password",
                            {
                                required: "Password can not be empty",
                                minLength: {
                                    value: 5,
                                    message: "Email must be at least 5 characters"
                                }
                            }
                        )}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    {errors.registerPassword && <p className='error'>{errors.registerPassword.message}</p>}
                </label>
                <Button type="submit" text="Register"/>
            </fieldset>
        </form>
    )
}

export default RegisterForm;