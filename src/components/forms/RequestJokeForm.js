import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './RequestJokeForm.css'
import JokeFlagSelector from "../FormComponents/JokeFlagSelector";
import JokeAboutSelector from "../FormComponents/JokeAboutSelector";
import JokeTypeSelector from "../FormComponents/JokeTypeSelector";
import JokeNumberSelector from "../FormComponents/JokeNumberSelector";

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

    useEffect(() => {
        reset({
            getJokeAboutSelector: '',
            getJokeFlagSelector: '',
            getNumberOfJokesSelector: '',
            getJokeTypeSelector: '',
        })
    }, [isRequestSuccessful])

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
            if (e.response.status === 400) {
                console.error(e.message);
                console.log('The server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).')
            } else if (e.response.status === 401) {
                console.error(e.response.data.message);
            } else {
                console.error(e);
            }
        }
    }

    function newRequest() {
        setSingleJoke('');
        setTwoPartSetup('');
        setTwoPartDelivery('');
        setAreMultipleJokes(false);
        setIsRequestSuccessful(false);

        {
            twoPartJokeArray.map((joke) => (
                console.log(joke.setup, joke.delivery)
            ))
        }
    }

    return (
        <>
            {isRequestSuccessful ?
                <>
                    {!isTwoPart && !areMultipleJokes &&
                        <h3>{singleJoke}</h3>
                    }

                    {!isTwoPart && areMultipleJokes &&
                        <>
                            <ul className='multipleJokesList'>
                                {singleJokeArray.map((joke, key) => (
                                    <li key={key}>{joke.joke}</li>
                                ))}
                            </ul>
                        </>
                    }

                    {isTwoPart && !areMultipleJokes &&
                        <article>
                            <h3>{twoPartSetup}</h3>
                            <h3>{twoPartDelivery}</h3>
                        </article>
                    }

                    {isTwoPart && areMultipleJokes &&
                        <>
                            <ul className='multipleJokesList'>
                                {twoPartJokeArray.map((joke, key) => (
                                    <li key={key}>
                                        <h3>{joke.setup}</h3>
                                        <h3>{joke.delivery}</h3>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }

                    <Button type='button' text='I want another joke' onClick={newRequest}/>
                </>
                :
                <>
                    <div className='requestPageHeader'>
                        <h1>So you don’t like our chicken jokes?</h1>
                    </div>
                    <form className='requestJokeForm' onSubmit={handleSubmit(requestJokeRequest)}>
                        <h3>Maybe we can find something else for you. Tell us what will make you laugh</h3>
                        <div className='outerRequestJoke'>
                            <label className='outerRequestJoke' htmlFor='getJokeAboutSelector'>
                                I want a joke about:
                            </label>
                            <select
                                {...register('getJokeAboutSelector',
                                    {
                                        required: "You must specify a subject",
                                    }
                                )}
                                onChange={(e) => setGetJokeAboutSelector(e.target.value)}
                            >
                                <JokeAboutSelector/>
                            </select>
                            {errors.getJokeAboutSelector &&
                                <p className='error'>{errors.getJokeAboutSelector.message}</p>}
                        </div>
                        <div className='outerRequestJoke'>
                            <label htmlFor='getJokeFlagSelector'>
                                It should not be:
                            </label>
                            <select {...register("getJokeFlagSelector")}
                                    onChange={(e) => setGetJokeFlagSelector(e.target.value)}>
                                <JokeFlagSelector/>
                            </select>
                        </div>
                        <div className='outerRequestJoke'>
                            <label htmlFor='getJokeTypeSelector'>
                                Joke type:
                            </label>
                            <select {...register("getJokeTypeSelector",
                                {
                                    required: "You must specify a joke type",
                                })}
                                    onChange={(e) => setGetJokeTypeSelector(e.target.value)}
                            >
                                <JokeTypeSelector/>
                            </select>
                            {errors.getJokeTypeSelector &&
                                <p className='error'>{errors.getJokeTypeSelector.message}</p>}
                        </div>
                        <div className='outerRequestJoke'>
                            <label htmlFor='getNumberOfJokesSelector'>
                                Give me:
                            </label>
                            <select
                                {...register('getNumberOfJokesSelector',
                                    {
                                        required: "You must specify the number of jokes",
                                    })}
                                onChange={(e) => setGetNumberOfJokesSelector(e.target.value)}
                            >
                                <JokeNumberSelector/>
                            </select>
                            {errors.getNumberOfJokesSelector &&
                                <p className='error'>{errors.getNumberOfJokesSelector.message}</p>}
                        </div>
                        <Button type='submit' text='Request Joke'/>
                    </form>
                </>
            }
        </>
    )
}

export default RequestJokeForm;