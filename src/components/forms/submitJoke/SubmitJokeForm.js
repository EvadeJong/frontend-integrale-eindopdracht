import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Button from '../button/Button';
import './SubmitJokeForm.css'
import Label from '../formComponents/Label';
import JokeFlagSelector from '../formComponents/JokeFlagSelector';
import JokeAboutSelector from '../formComponents/JokeAboutSelector';
import JokeTypeSelector from '../formComponents/JokeTypeSelector';
import ErrorMessage from '../errorMessage/ErrorMessage';

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
    const [loading, toggleLoading] = useState(false);

    async function submitJokeRequest() {
        toggleLoading(true);

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
        }
        catch (e) {
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

        toggleLoading(false);
    }

    function newRequest() {
        setIsTwoPart(false);
        setIsError(false);
        setIsRequestSuccessful(false);
        reset();
    }

    return (
        <>
            {isError &&
                <span className='sendJokeContainer'>
                    <ErrorMessage className={'errorMessage'} message={errorMessage}/>
                    <Button type='submit' text='I want to try again' onClick={newRequest}/>
                </span>
            }
            {isRequestSuccessful &&
                <>
                    <h3>Thank you for submitting your joke!</h3>
                    <span className='sendJokeContainer'>
                        <h3>A joke with subject: {jokeAboutSelector}</h3>

                        <h3>You selected flag: {jokeFlagSelector} </h3>

                        <h3> The type of joke is: {jokeTypeSelector}</h3>

                        <h3> This is your joke:</h3>
                        <p>  {submittedJoke} </p>
                        <p>  {submittedDelivery} </p>

                        <Button type='submit' text='I want to submit another joke' onClick={newRequest}/>
                    </span>
                </>
            }
            {!isError && !isRequestSuccessful &&
                <>
                    <h3>Let's find out!</h3>
                    {loading &&
                        <ErrorMessage className='fieldLoadingMessage' message='Loading...' />
                    }
                    <form className='submitJokeForm' onSubmit={handleSubmit(submitJokeRequest)}>
                       <span className='outerSubmitJoke'>
                           <Label htmlFor='jokeAboutSelector' labelText='I want a joke about:'/>
                            <select {...register('jokeAboutSelector',
                                {
                                    required: "You must specify a subject",
                                }
                            )}
                                    onChange={(e) => setJokeAboutSelector(e.target.value)}
                            >
                                <JokeAboutSelector/>
                            </select>
                        </span>
                        <span>
                            {errors.jokeAboutSelector &&
                                <ErrorMessage
                                    className={'fieldErrorMessageLight'}
                                    message={errors.jokeAboutSelector.message}
                                />
                            }
                        </span>
                        <span className='outerSubmitJoke'>
                            <Label htmlFor='jokeTypeSelector' labelText='And consists of:'/>
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
                        </span>
                        <span>
                            {errors.jokeTypeSelector &&
                                <ErrorMessage
                                    className={'fieldErrorMessageLight'}
                                    message={errors.jokeTypeSelector.message}
                                />
                            }
                        </span>
                        <span className='outerSubmitJoke'>
                            <Label htmlFor='jokeFlagSelector' labelText='Flag (can be empty):'/>
                            <select {...register('jokeFlagSelector')}
                                    onChange={(e) => setJokeFlagSelector(e.target.value)}>
                                <JokeFlagSelector/>
                            </select>
                        </span>
                        <Label htmlFor='textfieldJoke' labelText='The actual joke is:'/>
                        <span className='outerSubmitJoke'>
                            <textarea className='submitjoketextfield'
                                      id='submitjoketextfield'
                                      {...register("submitjoketextfield",
                                          {
                                              required: "Message can not be empty",
                                          },
                                      )}

                                      onChange={(e) => setSubmittedJoke(e.target.value)}>
                          </textarea>
                        </span>
                        <span>
                                  {errors.submitjoketextfield &&
                                      <ErrorMessage
                                          className={'fieldErrorMessageLight'}
                                          message={errors.submitjoketextfield.message}
                                      />
                                  }
                        </span>
                        {isTwoPart &&
                            <>
                                <Label htmlFor='textfieldJoke' labelText='The punchline of the joke is:'/>
                                <span className='outerSubmitJoke'>
                                <textarea className='submitjoketextfield'
                                          id='submitdeliverytextfield'
                                          {...register("submitdeliverytextfield",
                                              {
                                                  required: "Message can not be empty",
                                              },
                                          )}
                                          onChange={(e) => setSubmittedDelivery(e.target.value)}>
                                </textarea>
                                </span>
                                <span>
                                  {errors.submitdeliverytextfield &&
                                      <ErrorMessage
                                          className={'fieldErrorMessageLight'}
                                          message={errors.submitdeliverytextfield.message}
                                      />
                                  }
                                  </span>
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