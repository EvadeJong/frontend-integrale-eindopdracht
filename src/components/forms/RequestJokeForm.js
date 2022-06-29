import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './RequestJokeForm.css'
import JokeFlagSelector from "../formComponents/JokeFlagSelector";
import JokeAboutSelector from "../formComponents/JokeAboutSelector";
import JokeTypeSelector from "../formComponents/JokeTypeSelector";
import JokeNumberSelector from "../formComponents/JokeNumberSelector";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Label from "../formComponents/Label";

function RequestJokeForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

    const [getJokeAboutSelector, setGetJokeAboutSelector] = useState('');
    const [getJokeTypeSelector, setGetJokeTypeSelector] = useState('');
    const [getNumberOfJokesSelector, setGetNumberOfJokesSelector] = useState('');
    const [getJokeFlagSelector, setGetJokeFlagSelector] = useState('');

    const [singleJoke, setSingleJoke] = useState('');
    const [isTwoPart, setIsTwoPart] = useState(false);
    const [twoPartSetup, setTwoPartSetup] = useState('')
    const [twoPartDelivery, setTwoPartDelivery] = useState('');
    const [areMultipleJokes, setAreMultipleJokes] = useState(false);

    const [singleJokeArray, setSingleJokeArray] = useState([]);
    const [twoPartJokeArray, setTwoPartJokeArray] = useState([]);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function requestJokeRequest() {
        try {
            const category = getJokeAboutSelector;
            const flag = getJokeFlagSelector;
            const jokeType = getJokeTypeSelector;
            const numberOfJokes = getNumberOfJokesSelector;

            const result = await axios.get(`https://v2.jokeapi.dev/joke/${category}?format=json&?blacklistFlags=${flag}&lang=en&type=${jokeType}&amount=${numberOfJokes}`)
            console.log(jokeType);
            if (jokeType === 'twopart') {
                setIsTwoPart(true);
                if (numberOfJokes === '1') {
                    setTwoPartSetup(result.data.setup);
                    setTwoPartDelivery(result.data.delivery);
                } else {
                    setAreMultipleJokes(true);
                    setTwoPartJokeArray(result.data.jokes);
                }
            }
            if (jokeType === 'single') {
                setIsTwoPart(false);
                if (numberOfJokes === '1') {
                    setSingleJoke(result.data.joke);
                } else {
                    setAreMultipleJokes(true);
                    setSingleJokeArray(result.data.jokes);
                }
            }

            setIsRequestSuccessful(true);
        } catch (e) {
            setIsRequestSuccessful(false);
            setIsError(true);
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
    }

    function newRequest() {
        setAreMultipleJokes(false);
        setIsRequestSuccessful(false);
        setIsError(false);
        reset();
    }

    return (
        <>
            {isError &&
                <span>
                    <ErrorMessage className={'errorMessage'} message={errorMessage}/>
                    <Button type='submit' text='I want to try again' onClick={newRequest}/>
                </span>
            }
            {isRequestSuccessful &&
                <>
                    {!isTwoPart && !areMultipleJokes &&
                        <ul className='multipleJokesList'>
                            <li>{singleJoke}</li>
                        </ul>
                    }

                    {!isTwoPart && areMultipleJokes &&
                        <ul className='multipleJokesList'>
                            {singleJokeArray.map((joke, key) => (
                                <li key={key}>{joke.joke}</li>
                            ))}
                        </ul>
                    }

                    {isTwoPart && !areMultipleJokes &&
                        <article>
                            <h3>{twoPartSetup}</h3>
                            <h3>{twoPartDelivery}</h3>
                        </article>
                    }

                    {isTwoPart && areMultipleJokes &&
                        <ul className='multipleJokesList'>
                            {twoPartJokeArray.map((joke, key) => (
                                <li key={key}>
                                    <h3>{joke.setup}</h3>
                                    <h3>{joke.delivery}</h3>
                                </li>
                            ))}
                        </ul>
                    }

                    <Button type='button' text='I want another joke' onClick={newRequest}/>
                </>
            }
            {!isError && !isRequestSuccessful &&
                <>
                    <div className='requestPageHeader'>
                        <h1>So you don’t like our chicken jokes?</h1>
                    </div>
                    <form className='requestJokeForm' onSubmit={handleSubmit(requestJokeRequest)}>
                        <h3>Maybe we can find something else for you. Tell us what will make you laugh</h3>
                        <span className='outerRequestJoke'>
                            <Label htmlFor='getJokeAboutSelector' labelText='I want a joke about:'/>
                            <select {...register('getJokeAboutSelector',
                                {
                                    required: "You must specify a subject",
                                }
                            )}
                                    onChange={(e) => setGetJokeAboutSelector(e.target.value)}
                            >
                                <JokeAboutSelector/>
                            </select>
                        </span>
                        <span>
                            {errors.getJokeAboutSelector &&
                                <ErrorMessage
                                    className={'fieldErrorMessage'}
                                    message={errors.getJokeAboutSelector.message}
                                />
                            }
                        </span>
                        <span className='outerRequestJoke'>
                            <Label htmlFor='getJokeFlagSelector' labelText='Flag (can be empty):'/>
                            <select {...register("getJokeFlagSelector")}
                                    onChange={(e) => setGetJokeFlagSelector(e.target.value)}>
                                <JokeFlagSelector/>
                            </select>
                        </span>
                        <span className='outerRequestJoke'>
                            <Label htmlFor='getJokeTypeSelector' labelText='Joke type:'/>
                            <select {...register("getJokeTypeSelector",
                                {
                                    required: "You must specify a joke type",
                                })}
                                    onChange={(e) => setGetJokeTypeSelector(e.target.value)}
                            >
                                <JokeTypeSelector/>
                            </select>
                            </span>
                        <span>
                            {errors.getJokeTypeSelector &&
                                <ErrorMessage
                                    className={'fieldErrorMessage'}
                                    message={errors.getJokeTypeSelector.message}
                                />
                            }
                        </span>
                        <span className='outerRequestJoke'>
                            <Label htmlFor='getNumberOfJokesSelector' labelText='Give me:'/>
                            <select
                                {...register('getNumberOfJokesSelector',
                                    {
                                        required: "You must specify the number of jokes",
                                    })}
                                onChange={(e) => setGetNumberOfJokesSelector(e.target.value)}
                            >
                                <JokeNumberSelector/>
                            </select>
                        </span>
                        <span>
                            {errors.getNumberOfJokesSelector &&
                                <ErrorMessage
                                    className={'fieldErrorMessage'}
                                    message={errors.getNumberOfJokesSelector.message}
                                />
                            }
                        </span>
                        <Button type='submit' text='Request Joke'/>
                    </form>
                </>
            }
        </>
    )
}

export default RequestJokeForm;