import React, {useContext, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";

function LoginForm(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function signInRequest() {
        try{
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',
                {
                    "username": username,
                    "password": password,
                }
            )
            console.log(result.data.accessToken);
            login(result.data.accessToken);
        } catch(e){
            console.error(e);
        }
    }

    return(
        <form onSubmit={handleSubmit(signInRequest)}>
            <fieldset>
                <legend>
                    Please log in
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
                    {errors.username && <p>{errors.username.message}</p>}
                </label>

                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        id="password"
                        {...register("password",
                            {
                                required: "Password can not be empty",
                                minLength: {
                                    value: 5,
                                    message: "Email must be at least 5 characters"
                                }
                            }
                        )}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </label>
                <Button type="submit" text="Login"/>
            </fieldset>
        </form>
    )
}

export default LoginForm;