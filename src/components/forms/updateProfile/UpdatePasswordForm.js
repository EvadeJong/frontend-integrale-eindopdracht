import React, {useRef, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../../button/Button";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import Label from "../../formComponents/Label";
import './UpdateForm.css';
import {useHistory} from "react-router-dom";


function UpdatePasswordForm() {

    const controller = new AbortController();

    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm({});
    const password = useRef({});

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, toggleLoading] = useState(false);
    const history = useHistory();

    password.current = watch('password', '');

    useEffect(()=>{
        return history.listen((location) => {
            console.log(`You changed the page to: ${location.pathname}`)
        })

        return function cleanup(){
            controller.abort();
        }
    },[history]);

    async function updatePasswordRequest(data) {
        toggleLoading(true);
        const updatedPassword = data.password;
        const repeatedUpdatedPassword = data.repeatedPassword;
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                'https://frontend-educational-backend.herokuapp.com/api/user',
                {
                    "password": updatedPassword,
                    "repeatedPassword": repeatedUpdatedPassword
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            setIsRequestSuccessful(true);

        } catch (e) {
            setIsError(true);

            switch (e.response.status) {
                case 400:
                    setErrorMessage
                    ('The server was unable to process the request sent by the client due to invalid syntax');
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

    function backToHome() {
        reset();
        setIsRequestSuccessful(!isRequestSuccessful);
        history.push('./');
    }

    return (
        <>
            {isError &&
                <span>
                    <ErrorMessage className={'errorMessage'} message={errorMessage}/>
                    <Button type='submit' text='I want to try again' onClick={() => setIsError(false)}/>
                </span>
            }
            {isRequestSuccessful && !isError &&
                <>
                    <h3>Your info is successfully updated</h3>
                    <Button type='button' text='Back to homepage' onClick={backToHome}/>
                </>
            }
            {!isRequestSuccessful && !isError &&
                <form className='updatedProfileForm' onSubmit={handleSubmit(updatePasswordRequest)}>
                    <span className='outerProfileGroup'>

                        {loading &&
                            <ErrorMessage className='fieldLoadingMessage' message='Loading...'/>
                        }

                        <Label htmlFor='updatedPassword' labelText='Password:'/>
                        <input
                            name="password"
                            type="password"
                            {...register('password', {
                                required: "You must specify a password",
                                minLength: {
                                    value: 8,
                                    message: "Password must have 8 characters"
                                }
                            })}
                        />
                        <span>
                            {errors.password &&
                                <ErrorMessage
                                    className={'fieldErrorMessage'}
                                    message={errors.password.message}
                                />
                            }
                        </span>
                    </span>
                    <span className='outerProfileGroup'>
                        <Label htmlFor='profilePassword' labelText=' Repeat password:'/>
                        <input
                            name="password_repeat"
                            type="password"
                            {...register('password_repeat', {
                                validate: value =>
                                    value === password.current || "The passwords do not match"
                            })}
                        />
                        <span>
                                  {errors.password_repeat &&
                                      <ErrorMessage
                                          className={'fieldErrorMessage'}
                                          message={errors.password_repeat.message}
                                      />
                                  }
                        </span>
                    </span>
                    <Button type='submit' text='Change password'/>
                </form>
            }
        </>
    )
}

export default UpdatePasswordForm;
