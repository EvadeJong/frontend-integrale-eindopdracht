import React, {useEffect, useState} from "react";
import register, {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './SubmitJokeForm.css'
import Label from "../FormComponents/Label";
import JokeFlagSelector from "../FormComponents/JokeFlagSelector";

function SubmitJokeForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [submittedJoke, setSubmittedJoke] = useState('');

    const [getJokeAboutSelector, setGetJokeAboutSelector] = useState('');
    const [getJokeTypeSelector, setGetJokeTypeSelector] = useState('');
    const [getNumberOfJokesSelector, setGetNumberOfJokesSelector] = useState('');
    const [getJokeFlagSelector, setGetJokeFlagSelector] = useState('');


    useEffect(() => {
        reset({
            getJokeAboutSelector: '',
            getJokeFlagSelector: '',
            getNumberOfJokesSelector: '',
            getJokeTypeSelector: '',
        })
    }, [isRequestSuccessful])

    async function submitJokeRequest(data) {
        try {
            const category = getJokeAboutSelector;
            const flag = getJokeFlagSelector;
            const jokeType = getJokeTypeSelector;
            const numberOfJokes = getNumberOfJokesSelector;
            console.log(data);
            console.log(category, flag, jokeType, numberOfJokes);
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
        setIsRequestSuccessful(false);
    }

    return (
        <>
            {isRequestSuccessful ?
                <>
                    <h3>Thank you for submitting your joke!</h3>
                    <ul>
                        <li>

                        </li>
                        <li>

                        </li>
                    </ul>
                    <Button type='submit' text='I want to submit another joke' onClick={newRequest}/>
                </>
                :
                <>
                    <h3>Let's find out!</h3>
                    <form className='submitJokeForm' onSubmit={handleSubmit(submitJokeRequest)}>
                        <div className='outerSubmitJoke'>
                            <label htmlFor='jokeAboutSelector'>
                                The subject of my joke is:
                            </label>
                            <select {...register('jokeAboutSelector')}>
                                <option value=''>Select...</option>
                                <option value='any'>Any</option>
                                <option value='programming'>Programming</option>
                                <option value='dark'>Dark</option>
                                <option value='pun'>Pun</option>
                                <option value='spooky'>Spooky</option>
                                <option value='christmas'>Christmas</option>
                                <option value='misc'>Misc</option>
                            </select>
                        </div>
                        <div className='outerSubmitJoke'>
                            <label htmlFor='jokeConsistOfSelector'>
                                And consists of:
                            </label>
                            <select {...register('jokeConsistOfSelector')}>
                                <option value=''>Select...</option>
                                <option value='one-part'>One part</option>
                                <option value='two-part'>Two parts</option>
                            </select>
                        </div>
                        <div className='outerSubmitJoke'>

                            <Label htmlFor='getJokeFlagSelector' labelText='I consider my joke to be:' />
                            <select {...register('getJokeFlagSelector')}
                                    onChange={(e) => setGetJokeFlagSelector(e.target.value)}>
                                <JokeFlagSelector />
                            </select>
                        </div>
                        <label htmlFor='textfieldJoke'>
                            The actual joke is:
                        </label>
                        <textarea className='submitjoketextfield'
                                  id='submitjoketextfield'
                                  {...register("submitjoketextfield",
                                      {
                                          required: "Message can not be empty",
                                      },
                                  )}
                                  onChange={(e) => setSubmittedJoke(e.target.value)}>
                            </textarea>
                        {errors.submitjoketextfield && <p className='error'>{errors.submitjoketextfield.message}</p>}
                        <Button type='submit' text='Submit Joke'/>
                    </form>
                </>
            }

        </>
    )
}

export default SubmitJokeForm;