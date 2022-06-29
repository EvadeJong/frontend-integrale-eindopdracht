import React, {useEffect, useState} from "react";
import register, {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './SubmitJokeForm.css'
import Label from "../formComponents/Label";
import JokeFlagSelector from "../formComponents/JokeFlagSelector";
import JokeAboutSelector from "../formComponents/JokeAboutSelector";
import JokeTypeSelector from "../formComponents/JokeTypeSelector";

function SubmitJokeForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [submittedJoke, setSubmittedJoke] = useState('');
    const [submittedDelivery, setSubmittedDelivery] = useState('');

    const [jokeAboutSelector, setJokeAboutSelector] = useState('');
    const [jokeTypeSelector, setJokeTypeSelector] = useState('');
    const [jokeFlagSelector, setJokeFlagSelector] = useState('');

    const [isTwoPart, setIsTwoPart] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        reset({
            jokeAboutSelector: '',
            jokeFlagSelector: '',
            jokeTypeSelector: '',
            submittedJoke: '',
            submittedDelivery: '',
        })
    }, [isRequestSuccessful])

    async function submitJokeRequest() {
        try {
            const category = jokeAboutSelector;
            const flag = jokeFlagSelector;
            const jokeType = jokeTypeSelector;

//TODO: Joke submissions are temporarily disabled. Once it works code should be checked again to submit joke to the JokeAPI backend.
            if (jokeType === 'twopart') {
                setIsTwoPart(true);
                await axios.post(
                    'https://v2.jokeapi.dev/submit',
                    {
                        "formatVersion": 3,
                        "category": category,
                        "type": jokeType,
                        "setup": submittedJoke,
                        "delivery": submittedDelivery,
                        "flag": flag,
                        "lang": "en"
                    }, {
                        headers: {
                            "Content-Type": 'application/json',
                        }
                    }
                )
            } else {
                setIsTwoPart(false);
                await axios.post(
                    'https://v2.jokeapi.dev/submit',
                    {
                        "formatVersion": 3,
                        "category": category,
                        "type": jokeType,
                        "joke": submittedJoke,
                        "flags": {
                            flag: true
                        },
                        "lang": "en"
                    }, {
                        headers: {
                            "Content-Type": 'application/json',
                        }
                    }
                )
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
        setIsError(false);
        setIsRequestSuccessful(false);
    }

    function tryAgain() {
        reset({
            jokeAboutSelector: '',
            jokeFlagSelector: '',
            jokeTypeSelector: '',
            submittedJoke: '',
            submittedDelivery: '',
        })
        setIsTwoPart(false);
        setIsError(false);
        setIsRequestSuccessful(false);
    }

    return (
        <>
            {isError &&
                <div className='sendJokeContainer'>
                    <h3>{errorMessage}</h3>
                    <Button type='submit' text='I want to try again' onClick={tryAgain}/>
                </div>

            }
            {isRequestSuccessful &&
                <>
                    <h3>Thank you for submitting your joke!</h3>
                    <div className='sendJokeContainer'>
                        <h3>A joke with subject: {jokeAboutSelector}</h3>

                        <h3>You selected flag: {jokeFlagSelector} </h3>

                        <h3> The type of joke is: {jokeTypeSelector}</h3>

                        <h3> This is your joke:</h3>
                        <p>  {submittedJoke} </p>
                        <p>  {submittedDelivery} </p>

                        <Button type='submit' text='I want to submit another joke' onClick={newRequest}/>
                    </div>


                </>
            }
            {!isError && !isRequestSuccessful &&
                <>
                    <h3>Let's find out!</h3>
                    <form className='submitJokeForm' onSubmit={handleSubmit(submitJokeRequest)}>
                        <div className='outerSubmitJoke'>
                            <label htmlFor='jokeAboutSelector'>
                                The subject of my joke is:
                            </label>
                            <select {...register('jokeAboutSelector',
                                {
                                    required: "You must specify a subject",
                                })}
                                    onChange={(e) => setJokeAboutSelector(e.target.value)}
                            >
                                <JokeAboutSelector/>
                            </select>
                        </div>
                        <div className='outerSubmitJoke'>
                            <label htmlFor='jokeTypeSelector'>
                                And consists of:
                            </label>
                            <select {...register('jokeTypeSelector',
                                {
                                    required: "You must specify a joke type",
                                })}
                                    onChange={(e) => {
                                        setJokeTypeSelector(e.target.value);
                                        setIsTwoPart(e.target.value === "twopart");
                                    }}
                            >
                                <JokeTypeSelector/>
                            </select>
                        </div>
                        <div className='outerSubmitJoke'>
                            <Label htmlFor='jokeFlagSelector' labelText='I consider my joke to be:'/>
                            <select {...register('jokeFlagSelector')}
                                    onChange={(e) => setJokeFlagSelector(e.target.value)}>
                                <JokeFlagSelector/>
                            </select>
                        </div>

                        <Label htmlFor='textfieldJoke' labelText='The actual joke is:'/>
                        <div className='outerSubmitJoke'>
                        <textarea className='submitjoketextfield'
                                  id='submitjoketextfield'
                                  {...register("submitjoketextfield",
                                      {
                                          required: "Message can not be empty",
                                      },
                                  )}

                                  onChange={(e) => setSubmittedJoke(e.target.value)}>
                        </textarea>
                        </div>
                        {isTwoPart &&
                            <>
                                <div className='outerSubmitJoke'>
                                <textarea className='submitjoketextfield'
                                          id='submitdeliverytextfield'
                                          {...register("submitdeliverytextfield",
                                              {
                                                  required: "Message can not be empty",
                                              },
                                          )}
                                          onChange={(e) => setSubmittedDelivery(e.target.value)}>
                                </textarea>
                                    {errors.submitjoketextfield &&
                                        <p className='error'>{errors.submitjoketextfield.message}</p>}
                                </div>
                            </>
                        }

                        <Button type='submit' text='Submit Joke'/>
                    </form>
                </>
            }
        </>
    )
}

export default SubmitJokeForm;