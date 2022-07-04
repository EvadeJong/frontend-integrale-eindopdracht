import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Button from '../../button/Button';
import './SubmitJokeForm.css'
import Label from '../../formComponents/Label';
import JokeFlagSelector from '../../formComponents/JokeFlagSelector';
import JokeAboutSelector from '../../formComponents/JokeAboutSelector';
import JokeTypeSelector from '../../formComponents/JokeTypeSelector';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import ContentContainer from "../../contentContainer/ContentContainer";
import InformationMessage from "../../informationMessage/InformationMessage";

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

    const [jokeAboutIcon, setJokeAboutIcon] = useState('fa-solid fa-circle-info');
    const [jokeTypeIcon, setJokeTypeIcon] = useState('fa-solid fa-circle-info');
    const [flagIcon, setFlagIcon] = useState('fa-solid fa-circle-info');
    const [jokeFieldIcon, setJokeFieldIcon] = useState('fa-solid fa-circle-info');
    const [punchlineFieldIcon, setPunchlineFieldIcon] = useState('fa-solid fa-circle-info');
    const [showPunchlineFieldInformation, setShowPunchlineFieldInformation] = useState(false);
    const [showJokeFieldInformation, setShowJokeFieldInformation] = useState(false);
    const [showJokeTypeInformation, setShowJokeTypeInformation] = useState(false);
    const [showJokeAboutInformation, setShowJokeAboutInformation] = useState(false);
    const [showFlagInformation, setShowFlagInformation] = useState(false);

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

    function provideInfo(fieldname) {
        switch (fieldname) {
            case 'jokeAbout':
                if (jokeAboutIcon === 'fa-solid fa-circle-info') {
                    setJokeAboutIcon('fa-solid fa-circle-xmark')
                    setShowJokeAboutInformation(true);
                } else {
                    setJokeAboutIcon('fa-solid fa-circle-info')
                    setShowJokeAboutInformation(false);
                }
                break
            case 'jokeType':
                if (jokeTypeIcon === 'fa-solid fa-circle-info') {
                    setJokeTypeIcon('fa-solid fa-circle-xmark')
                    setShowJokeTypeInformation(true);
                } else {
                    setJokeTypeIcon('fa-solid fa-circle-info')
                    setShowJokeTypeInformation(false);
                }
                break
            case 'jokeFlag':
                if (flagIcon === 'fa-solid fa-circle-info') {
                    setFlagIcon('fa-solid fa-circle-xmark')
                    setShowFlagInformation(true);
                } else {
                    setFlagIcon('fa-solid fa-circle-info')
                    setShowFlagInformation(false);
                }
                break
            case 'jokeField':
                if(jokeFieldIcon === 'fa-solid fa-circle-info'){
                    setJokeFieldIcon('fa-solid fa-circle-xmark')
                    setShowJokeFieldInformation(true);
                }else{
                    setJokeFieldIcon('fa-solid fa-circle-info')
                    setShowJokeFieldInformation(false);
                }
                break
            case 'punchlineField':
                if(punchlineFieldIcon === 'fa-solid fa-circle-info'){
                    setPunchlineFieldIcon('fa-solid fa-circle-xmark')
                    setShowPunchlineFieldInformation(true);
                }else{
                    setPunchlineFieldIcon('fa-solid fa-circle-info')
                    setShowPunchlineFieldInformation(false);
                }
                break
            default:
                setShowJokeTypeInformation(false);
                setShowJokeAboutInformation(false);
                setShowFlagInformation(false);
                setShowJokeFieldInformation(false);
                setShowPunchlineFieldInformation(false);
        }
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
                                    required: "You must specify a subject",
                                }
                            )}
                                    onChange={(e) => setJokeAboutSelector(e.target.value)}
                                    data-testid="jokeAboutSelector"
                            >
                                <JokeAboutSelector/>
                            </select>
                           <i className={jokeAboutIcon} onClick={() => provideInfo('jokeAbout')}></i>
                           {showJokeAboutInformation &&
                               <InformationMessage
                                   message='What should the joke be about?'
                               />
                           }
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
                                    required: "You must specify a joke type",
                                })}
                                    onChange={(e) => {
                                        setJokeTypeSelector(e.target.value);
                                        setIsTwoPart(e.target.value === "twopart");
                                    }}
                                    data-testid="jokeTypeSelector"
                            >
                                <JokeTypeSelector/>
                            </select>
                           <i className={jokeTypeIcon}
                              onClick={() => provideInfo('jokeType')}></i>
                           {showJokeTypeInformation &&
                               <InformationMessage
                                   message='Select the type of the joke'
                               />
                           }
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
                            <select {...register('jokeFlagSelector')}
                                    onChange={(e) => setJokeFlagSelector(e.target.value)}>
                                <JokeFlagSelector/>
                            </select>
                           <i className={flagIcon}
                              onClick={() => provideInfo('jokeFlag')}></i>
                           {showFlagInformation &&
                               <InformationMessage
                                   message='What should it not be? (optional)'
                               />
                           }
                        </span>
                        <span className='outerSubmitJoke'>
                       <Label htmlFor='textfieldJoke' labelText='The actual joke is:'/>
                            <textarea className='submitjoketextfield'
                                      id='submitjoketextfield'
                                      {...register("submitjoketextfield",
                                          {
                                              required: "Joke can not be empty",
                                              minLength: {
                                                  value: 5,
                                                  message: "A joke must have at least 5 characters"
                                              }
                                          },
                                      )
                                    }
                                    onChange={(e) => setSubmittedJoke(e.target.value)}>
                          </textarea>
                            <i className={jokeFieldIcon}
                               onClick={() => provideInfo('jokeField')}></i>
                            {showJokeFieldInformation &&
                                <InformationMessage
                                    message='Tell us your joke here'
                                />
                            }
                        </span>
                        <span className='error'>
                            {errors.submitjoketextfield &&
                                <ErrorMessage
                                    className={'fieldErrorMessageLight'}
                                    message={errors.submitjoketextfield.message}
                                />
                            }
                        </span>
                        <Button type='submit' text='Submit Joke'/>
                    </form>
                </>
             }
            {isRequestSuccessful &&
                <>
                  <ContentContainer
                    subtitle='Thank you for submitting your joke!'
                    content= {submittedJoke}
                    subcontent= {submittedDelivery}
                    />
                    <Button type='submit' text='I want to submit another joke' onClick={newRequest}/>
                </>
            }
            {isTwoPart &&
                <>
                                <Label htmlFor='textfieldJoke' labelText='The punchline of the joke is:'/>
                                <span className='outerSubmitJoke'>
                                <textarea className='submitjoketextfield'
                                          id='submitdeliverytextfield'
                                          {...register("submitdeliverytextfield",
                                              {
                                                  required: "Message can not be empty",
                                                  minLength: {
                                                      value: 5,
                                                      message: "A punchline must have at least 5 characters"
                                                  }
                                              },
                                          )}
                                          onChange={(e) => setSubmittedDelivery(e.target.value)}>
                                </textarea>
                                    <i className={punchlineFieldIcon}
                                       onClick={() => provideInfo('punchlineField')}></i>
                                    {showPunchlineFieldInformation &&
                                        <InformationMessage
                                            message='Tell us your joke here'
                                        />
                                    }
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

        </span>
    )
}

export default SubmitJokeForm;