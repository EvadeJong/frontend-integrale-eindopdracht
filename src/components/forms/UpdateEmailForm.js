import React, {useState, useContext, useRef} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './SubmitJokeForm.css'
import {AuthContext} from "../../context/AuthContext";


function UpdateEmailForm() {

    const {user: {email}} = useContext(AuthContext);
    const [updatedEmail, setUpdatedEmail] = useState(email);
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({});

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function updateEmailRequest() {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                'https://frontend-educational-backend.herokuapp.com/api/user',
                {
                    "email": updatedEmail,
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            console.log(`Email geupdated naar ${updatedEmail}`);

            setIsRequestSuccessful(true);

        } catch (e) {
            setIsError(true);

            switch (e.response.status) {
                case 400:
                    setErrorMessage
                    ('The email is already in use. If you already have an account, please log in.')
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
    }

    return (
        <>
            {isError &&
                <div>
                    <h3>{errorMessage}</h3>
                    <Button type='submit' text='I want to try again' onClick={() => setIsError(false)}/>
                </div>
            }
            {isRequestSuccessful && !isError &&
                <>
                    <h3>Your info is successfully updated</h3>
                    <Button type='button' text='Back to profile' onClick={() => window.location.reload(true)}/>
                </>
            }
            {!isRequestSuccessful && !isError &&
                <form className='updatedProfileForm' onSubmit={handleSubmit(updateEmailRequest)}>
                    <div className='outerProfileGroup'>
                        <label htmlFor='updatedEmail'>
                            E-mail:
                        </label>
                        <input
                            type='email'
                            id='updatedEmail'
                            defaultValue={email}
                            {...register('updatedEmail',
                                {
                                    required: 'Email can not be empty',
                                })
                            }
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                        />
                        {errors.updatedEmail && <p className='error'>{errors.updatedEmail.message}</p>}
                    </div>
                    <Button type='submit' text='Update email'/>
                </form>
            }
        </>
    )
}

export default UpdateEmailForm;
