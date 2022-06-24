import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './SubmitJokeForm.css'

function SubmitJokeForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [submittedJoke, setSubmittedJoke] = useState('');

    useEffect(() => {
        reset({
            jokeAboutSelector: '',
            jokeConsistOfSelector: '',
            jokeIsSelector: '',
            textfieldJoke: '',
        })
    }, [isRequestSuccessful])

    async function submitJokeRequest(data) {
        try {
            console.log(data);
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
                            <label htmlFor='jokeIsSelector'>
                                I consider my joke to be:
                            </label>
                            <select {...register('jokeIsSelector')}>
                                <option value=''>Select...</option>
                                <option value='any'>Any</option>
                                <option value='nsfw'>Nsfw</option>
                                <option value='religious'>Religious</option>
                                <option value='political'>Political</option>
                                <option value='racist'>Racist</option>
                                <option value='sexist'>Sexist</option>
                                <option value='explicit'>Explicit</option>
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