//React imports
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';

//3rd party imports
import axios from 'axios';

//CSS imports
import './RequestJokeForm.css'

//Component imports
import JokeFlagSelector from '../../formComponents/JokeFlagSelector';
import JokeAboutSelector from '../../formComponents/JokeAboutSelector';
import JokeTypeSelector from '../../formComponents/JokeTypeSelector';
import JokeNumberSelector from '../../formComponents/JokeNumberSelector';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Label from '../../formComponents/Label';
import ContentContainer from '../../contentContainer/ContentContainer';
import InformationMessage from '../../informationMessage/InformationMessage';
import Button from '../../button/Button';

function RequestJokeForm() {

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    });
    const history = useHistory();

    //fieldsettings and icons
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [singleJoke, setSingleJoke] = useState('');
    const [isTwoPart, setIsTwoPart] = useState(false);
    const [twoPartSetup, setTwoPartSetup] = useState('')
    const [twoPartDelivery, setTwoPartDelivery] = useState('');
    const [areMultipleJokes, setAreMultipleJokes] = useState(false);
    const [singleJokeArray, setSingleJokeArray] = useState([]);
    const [twoPartJokeArray, setTwoPartJokeArray] = useState([]);
    const infoIcon = 'fa-solid fa-circle-info';
    const xmarkIcon = 'fa-solid fa-circle-xmark';
    const [jokeAboutIcon, setJokeAboutIcon] = useState(infoIcon);
    const [jokeTypeIcon, setJokeTypeIcon] = useState(infoIcon);
    const [flagIcon, setFlagIcon] = useState(infoIcon);
    const [nrOfJokesIcon, setNrOfJokesIcon] = useState(infoIcon);
    const [showNrOfJokesInformation, setShowNrOfJokesInformation] = useState(false);
    const [showJokeTypeInformation, setShowJokeTypeInformation] = useState(false);
    const [showJokeAboutInformation, setShowJokeAboutInformation] = useState(false);
    const [showFlagInformation, setShowFlagInformation] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        return function cleanup() {
            controller.abort();
        }
    }, [history.location.pathname]);

    async function requestJokeRequest(data) {
        toggleLoading(true);

        try {
            const category = data.getJokeAboutSelector;
            const flag = data.getJokeFlagSelector;
            const jokeType = data.getJokeTypeSelector;
            const numberOfJokes = data.getNumberOfJokesSelector;

            const result = await axios.get(
                `https://v2.jokeapi.dev/joke/${category}?format=json&?blacklistFlags=${flag}&lang=en&type=${jokeType}&amount=${numberOfJokes}`,
            );

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
        toggleLoading(false);
    }

    function provideInfo(fieldname) {
        switch (fieldname) {
            case 'jokeAbout':
                if (jokeAboutIcon === infoIcon) {
                    setJokeAboutIcon(xmarkIcon)
                    setShowJokeAboutInformation(true);
                } else {
                    setJokeAboutIcon(infoIcon)
                    setShowJokeAboutInformation(false);
                }
                break
            case 'jokeType':
                if (jokeTypeIcon === infoIcon) {
                    setJokeTypeIcon(xmarkIcon)
                    setShowJokeTypeInformation(true);
                } else {
                    setJokeTypeIcon(infoIcon)
                    setShowJokeTypeInformation(false);
                }
                break
            case 'jokeFlag':
                if (flagIcon === infoIcon) {
                    setFlagIcon(xmarkIcon)
                    setShowFlagInformation(true);
                } else {
                    setFlagIcon(infoIcon)
                    setShowFlagInformation(false);
                }
                break
            case 'nrOfJokes':
                if (nrOfJokesIcon === infoIcon) {
                    setNrOfJokesIcon(xmarkIcon)
                    setShowNrOfJokesInformation(true);
                } else {
                    setNrOfJokesIcon(infoIcon)
                    setShowNrOfJokesInformation(false);
                }
                break
            default:
                setShowJokeTypeInformation(false);
                setShowJokeAboutInformation(false);
                setShowFlagInformation(false);
                setShowNrOfJokesInformation(false);
        }
    }

    function newRequest() {
        setAreMultipleJokes(false);
        setIsRequestSuccessful(false);
        setIsError(false);
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
                        {!isError && !isRequestSuccessful &&
                            <>
                                <ContentContainer
                                    subtitle="So you don't like our chicken jokes?"
                                    content='Maybe we can find something else for you. Tell us what will make you laugh.
                                             You can revisit the chicken jokes by clicking on the bird icon above.'
                                />
                                <form className='requestJokeForm' onSubmit={handleSubmit(requestJokeRequest)}>
                                    {loading &&
                                        <ErrorMessage className='fieldLoadingMessage' message='Loading...'/>
                                    }
                                    <span className='outerRequestJoke'>
                                <Label htmlFor='getJokeAboutSelector' labelText='I want a joke about:'/>
                                <select {...register('getJokeAboutSelector',
                                    {
                                        required: 'You must specify a subject',
                                    }
                                )}
                                        data-testid='jokeAboutSelector'
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
                                {errors.getJokeAboutSelector &&
                                    <ErrorMessage
                                        className={'fieldErrorMessage'}
                                        message={errors.getJokeAboutSelector.message}
                                    />
                                }
                            </span>
                                    <span className='outerRequestJoke'>
                                <Label htmlFor='getJokeFlagSelector' labelText='I do not want (optional):'/>
                                <select 
                                    {...register('getJokeFlagSelector')}
                                    data-testid="jokeFlagSelector"
                                q>
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
                                    <span className='outerRequestJoke'>
                                <Label htmlFor='getJokeTypeSelector' labelText='Joke type:'/>
                                <select {...register('getJokeTypeSelector',
                                    {
                                        required: 'You must specify a joke type',
                                    })}
                                        data-testid='jokeTypeSelector'
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
                                            required: 'You must specify the number of jokes',
                                        })}
                                    data-testid='jokeNumberSelector'
                                >
                                    <JokeNumberSelector/>
                                </select>
                                        <i className={nrOfJokesIcon}
                                           onClick={() => provideInfo('nrOfJokes')}></i>
                                        {showNrOfJokesInformation &&
                                            <InformationMessage
                                                message='Select the number of the joke (1, 3 or 5)'
                                            />
                                        }
                            </span>
                                    <span className='error'>
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
                        {isRequestSuccessful &&
                            <>
                                {!isTwoPart && !areMultipleJokes &&
                                    <ul className='jokesList'>
                                        <li>{singleJoke}</li>
                                    </ul>
                                }
                                {!isTwoPart && areMultipleJokes &&
                                    <ul className='jokesList'>
                                        {singleJokeArray.map((joke, key) => (
                                            <li key={key}>{joke.joke}</li>
                                        ))}
                                    </ul>
                                }
                                {isTwoPart && !areMultipleJokes &&
                                    <ul className='jokesList'>
                                        <li>
                                            <h3>{twoPartSetup}</h3>
                                            <h3>{twoPartDelivery}</h3>
                                        </li>
                                    </ul>
                                }
                                {isTwoPart && areMultipleJokes &&
                                    <ul className='jokesList'>
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
                    </span>
                </span>
            </section>
        </main>
    )
}

export default RequestJokeForm;