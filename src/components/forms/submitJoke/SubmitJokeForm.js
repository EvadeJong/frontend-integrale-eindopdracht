//React imports
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';

//3rd party imports
import axios from 'axios';

//CSS imports
import './SubmitJokeForm.css'

//Component imports
import Button from '../../button/Button';
import Label from '../../formComponents/Label';
import JokeFlagSelector from '../../formComponents/JokeFlagSelector';
import JokeAboutSelector from '../../formComponents/JokeAboutSelector';
import JokeTypeSelector from '../../formComponents/JokeTypeSelector';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import ContentContainer from '../../contentContainer/ContentContainer';
import InformationProvider, {FieldName} from '../../informationProvider/InformationProvider';

function SubmitJokeForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const history = useHistory();

    //fieldsettings and icons
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [isTwoPart, setIsTwoPart] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        return function cleanup() {
            controller.abort();
        }
    }, [history.location.pathname]);

    async function submitJokeRequest(data) {
        toggleLoading(true);

        try {
            const category = data.jokeAboutSelector;
            const flag = data.jokeFlagSelector;
            const jokeType = data.jokeTypeSelector;
            const joke = data.submitjoketextfield;
            const delivery = data.submitdeliverytextfield;

//TODO: Joke submissions are temporarily disabled. Once it works code should be checked again to submit joke to the JokeAPI backend.
            if (jokeType === 'twopart') {
                setIsTwoPart(true);

                await axios.post(
                    "https://v2.jokeapi.dev/submit",
                    {
                        "formatVersion": 3,
                        "category": category,
                        "type": jokeType,
                        "setup": joke,
                        "delivery": delivery,
                        "flag": flag,
                        "lang": "en"
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
            } else {
                setIsTwoPart(false);
                console.log(category, flag, jokeType, joke, delivery);
                await axios.post(
                    "https://v2.jokeapi.dev/submit",
                    {
                        "formatVersion": 3,
                        "category": category,
                        "type": jokeType,
                        "joke": joke,
                        "flags": {
                            flag: true
                        },
                        "lang": "en"
                    }, {
                        headers: {
                            "Content-Type": "application/json",
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

        toggleLoading(false);
    }

    function newRequest() {
        setIsTwoPart(false);
        setIsError(false);
        setIsRequestSuccessful(false);
        reset();
    }

    return (
        <span className='jokeContentContainer'>
            {isError &&
                <span className='sendJokeContainer'>
                    <ErrorMessage className={'errorMessage'} message={errorMessage}/>
                    <Button type='submit' text='I want to try again' onClick={newRequest}/>
                </span>
            }
            {!isError && !isRequestSuccessful &&
                <>
                    {loading &&
                        <ErrorMessage className='fieldLoadingMessage' message='Loading...'/>
                    }
                    <form className='submitJokeForm' onSubmit={handleSubmit(submitJokeRequest)}>
                       <span className='outerSubmitJoke'>
                           <Label htmlFor='jokeAboutSelector' labelText='I want a joke about:'/>
                            <select {...register('jokeAboutSelector',
                                {
                                    required: 'You must specify a subject',
                                }
                            )}
                                    data-testid='jokeAboutSelector'
                            >
                                <JokeAboutSelector/>
                            </select>
                            <InformationProvider fieldname={FieldName.JokeAbout}/>
                        </span>
                        <span className='error'>
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
                                    required: 'You must specify a joke type',
                                })}

                                    data-testid='jokeTypeSelector'
                            >
                                <JokeTypeSelector/>
                            </select>
                            <InformationProvider fieldname={FieldName.JokeType}/>
                        </span>
                        <span className='error'>
                            {errors.jokeTypeSelector &&
                                <ErrorMessage
                                    className={'fieldErrorMessageLight'}
                                    message={errors.jokeTypeSelector.message}
                                />
                            }
                        </span>
                        <span className='outerSubmitJoke'>
                            <Label htmlFor='jokeFlagSelector' labelText='Flag (optional):'/>
                            <select {...register('jokeFlagSelector')}>
                                <JokeFlagSelector/>
                            </select>
                            <InformationProvider fieldname={FieldName.JokeFlag}/>
                        </span>
                        <span className='outerSubmitJoke'>
                       <Label htmlFor='textfieldJoke' labelText='The actual joke is:'/>
                            <textarea className='submitjoketextfield'
                                      id='submitjoketextfield'
                                      spellCheck='true'
                                      lang='en'
                                      {...register('submitjoketextfield',
                                          {
                                              required: 'Joke can not be empty',
                                              minLength: {
                                                  value: 5,
                                                  message: 'A joke must have at least 5 characters'
                                              }
                                          },
                                      )
                                      }>
                            </textarea>
                            <InformationProvider fieldname={FieldName.JokeField}/>
                        </span>
                        <span className='error'>
                            {errors.submitjoketextfield &&
                                <ErrorMessage
                                    className={'fieldErrorMessageLight'}
                                    message={errors.submitjoketextfield.message}
                                />
                            }
                        </span>
                        {isTwoPart &&
                            <>
                                <span className='outerSubmitJoke'>
                                    <Label htmlFor='textfieldJoke' labelText='The punchline is:'/>

                                    <textarea className='submitjoketextfield'
                                            id='submitdeliverytextfield'
                                            spellCheck='true'
                                            lang='en'
                                            {...register('submitdeliverytextfield',
                                                {
                                                    required: 'Message can not be empty',
                                                    minLength: {
                                                        value: 5,
                                                        message: 'A punchline must have at least 5 characters'
                                                    }
                                                },
                                            )}>
                                    </textarea>
                                    <InformationProvider fieldname={FieldName.PunchlineField}/>
                                </span>
                                <span className='error'>
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
            {isRequestSuccessful &&
                <>
                    <ContentContainer
                        subtitle='Thank you for submitting your joke!'
                    />
                    <Button type='submit' text='I want to submit another joke' onClick={newRequest}/>
                </>
            }

        </span>
    )
}

export default SubmitJokeForm;