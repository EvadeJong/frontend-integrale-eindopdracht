import React, {useEffect, useState} from "react";
import register, {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './SubmitJokeForm.css'
import Label from "../FormComponents/Label";
import JokeFlagSelector from "../FormComponents/JokeFlagSelector";
import JokeAboutSelector from "../FormComponents/JokeAboutSelector";
import JokeTypeSelector from "../FormComponents/JokeTypeSelector";

function SubmitJokeForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [submittedJoke, setSubmittedJoke] = useState('');
    const [submittedDelivery, setSubmittedDelivery] = useState('');

    const [jokeAboutSelector, setJokeAboutSelector] = useState('');
    const [jokeTypeSelector, setJokeTypeSelector] = useState('');
    const [jokeFlagSelector, setJokeFlagSelector] = useState('');
    const [isTwoPart, setIsTwoPart] = useState(false);

    useEffect(() => {
        reset({
            jokeAboutSelector: '',
            jokeFlagSelector: '',
            jokeTypeSelector: '',
        })
    }, [isRequestSuccessful])

    async function submitJokeRequest(data) {
        try {
            const category = jokeAboutSelector;
            const flag = jokeFlagSelector;
            const jokeType = jokeTypeSelector;

            console.log(jokeType);

            if (jokeType === 'twopart') {
                setIsTwoPart(true);
                console.log(category, flag, jokeType, submittedJoke, submittedDelivery)
            } else {
                setIsTwoPart(false);
                console.log(category, flag, jokeType, submittedJoke)
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
                                    onChange={(e) => setJokeTypeSelector(e.target.value)}
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