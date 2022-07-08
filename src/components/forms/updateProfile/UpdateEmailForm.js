//React imports
import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

//3rd party imports
import axios from "axios";
import Button from "../../button/Button";

//CSS imports
import './UpdateForm.css';

//Context imports
import {AuthContext} from "../../../context/AuthContext";

//Component imports
import ErrorMessage from "../../errorMessage/ErrorMessage";
import Label from "../../formComponents/Label";
import ContentContainer from "../../contentContainer/ContentContainer";

function UpdateEmailForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        mode: 'onChange',
    });
    const history = useHistory();
    const {user: {email}} = useContext(AuthContext);


    //fieldsettings and icons
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        return function cleanup() {
            controller.abort();
        }
    }, [history.location.pathname]);

    async function updateEmailRequest(data) {
        toggleLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                "https://frontend-educational-backend.herokuapp.com/api/user",
                {
                    "email": data.updatedEmail,
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
                    <ContentContainer
                        content='Your info is successfully updated'
                    />
                    <Button type='button' text='Back to homepage' onClick={backToHome}/>
                </>
            }
            {!isRequestSuccessful && !isError &&
                <form className='updatedProfileForm' onSubmit={handleSubmit(updateEmailRequest)}>

                    {loading &&
                        <ErrorMessage className='fieldLoadingMessage' message='Loading...'/>
                    }

                    <span className='outerProfileGroup'>
                        <Label htmlFor='updatedEmail' labelText='E-mail:'/>
                        <input
                            type='email'
                            id='updatedEmail'
                            defaultValue={email}
                            {...register('updatedEmail',
                                {
                                    required: 'Specify an email address',
                                })
                            }
                        />
                    </span>
                    <span>
                        {errors.updatedEmail &&
                            <ErrorMessage className={'fieldErrorMessage'} message={errors.updatedEmail.message}/>}
                    </span>
                    <Button type='submit' text='Update email'/>
                </form>
            }
        </>
    )
}

export default UpdateEmailForm;
