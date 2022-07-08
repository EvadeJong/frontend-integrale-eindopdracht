//React imports
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

//3rd party imports
import axios from 'axios';

//CSS imports
import './RequestJokeForm.css';

//Component imports
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Button from '../../button/Button';

function RequestSafeModeJokeForm() {

    const history = useHistory();

    //fieldsettings and icons
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [setup, setSetup] = useState('');
    const [delivery, setDelivery] = useState('');
    const [joke, setJoke] = useState('');
    const [showNewJoke, setShowNewJoke] = useState(false);
    const [isTwoPart, setIsTwoPart] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        return function cleanup() {
            controller.abort();
        }
    }, [history.location.pathname]);

    useEffect(() => {
        toggleLoading(true);

        async function getSafeJoke() {
            try {
                const result = await axios.get(' https://v2.jokeapi.dev/joke/Any?safe-mode')
                if (result.data.type === 'twopart') {
                    setSetup(result.data.setup);
                    setDelivery(result.data.delivery);
                    setIsTwoPart(true);
                } else {
                    setJoke(result.data.joke);
                    setIsTwoPart(false);
                }
            } catch (e) {
                switch (e.response.status) {
                    case 400:
                        setErrorMessage
                        ('The request you have sent to JokeAPI is formatted incorrectly and cannot be processed')
                        break;
                    case 403:
                        setErrorMessage
                        ('You have been added to the blacklist due to malicious behavior and are not allowed to send requests to JokeAPI anymore');
                        break;
                    case 404:
                        setErrorMessage
                        ('The URL you have requested couldn\'t be found');
                        break;
                    case 413:
                        setErrorMessage
                        ('The payload data sent to the server exceeds the maximum size of 5120 bytes');
                        break;
                    case 414:
                        setErrorMessage
                        ('The URL exceeds the maximum length of 250 characters');
                        break;
                    case 429:
                        setErrorMessage
                        ('You have exceeded the limit of 120 requests per minute and have to wait a bit until you are allowed to send requests again');
                        break;
                    case 500:
                        setErrorMessage
                        (e.response.data.additionalInfo)
                        break;
                    case 523:
                        setErrorMessage
                        ('The server is temporarily offline due to maintenance or a dynamic IP update. Please be patient.')
                        break;
                    default:
                        setErrorMessage(e);
                }
            }
        };
        toggleLoading(false);
        getSafeJoke();
    }, [showNewJoke])

    function newRequest() {
        setIsError(false);
        setShowNewJoke(!showNewJoke);
    }

    return (
        <main>
            <section className='pageOuterContainer'>
                <span className='pageInnerContainer'>
                    <span className='requestJokeContentContainer'>
                        {isError &&
                            <span>
                                <ErrorMessage className={'errorMessage'} message={errorMessage}/>
                                <Button type='submit' text='I want to try again' onClick={newRequest}/>
                            </span>
                        }
                        {loading &&
                            <ErrorMessage className='fieldLoadingMessage' message='Loading...'/>
                        }
                        {!isTwoPart &&
                            <ul className='jokesList'>
                                <li>{joke}</li>
                            </ul>
                        }
                        {isTwoPart &&
                            <ul className='jokesList'>
                                <li>
                                    <h3>{setup}</h3>
                                    <h3>{delivery}</h3>
                                </li>
                            </ul>
                        }
                        <Button type='button' text='I want another joke' onClick={newRequest}/>
                    </span>
                </span>
            </section>
        </main>
    )
}

export default RequestSafeModeJokeForm;