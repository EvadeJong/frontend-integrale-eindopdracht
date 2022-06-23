import React, {useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './RequestJokeForm.css'
import { useHistory } from "react-router-dom";

function RequestJokeForm(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            getJokeAboutSelector: '',
            getJokeShouldntBeSelector: '',
            getNumberOfJokesSelector: '',
        }
    });
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const history = useHistory();

    async function requestJokeRequest(data) {
        try {
            console.log(data);
            setIsRequestSuccessful(true);
        } catch (e) {
            setIsRequestSuccessful(false);
            if (e.response.status === 400){
                console.error(e.message);
                console.log('The server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).')
            }
            else if(e.response.status === 401) {
                console.error(e.response.data.message);
            }else{
                console.error(e);
            }
        }}

        function newRequest() {
            setIsRequestSuccessful(false);
        }

    return(

        <>
            <form className='requestJokeForm' onSubmit={handleSubmit(requestJokeRequest)}>
                {isRequestSuccessful ?
                    <>
                        <h3>Joke requested succesfully</h3>
                        <Button type="submit" text="I want another joke" onClick={ newRequest }/>
                    </>
                    :
                    <>
                        <div className='requestPageHeader'>
                            <h3>So you don’t think our chicken jokes are funny?</h3>
                            <h3>Maybe we can find something else for you.</h3>
                            <h4>Tell us what will make you laugh </h4>
                        </div>
                        <label className='outer' htmlFor='getJokeAboutSelector'>
                            I want a:
                            <select className='inner' {...register('getJokeAboutSelector')}>
                                <option value="">Select...</option>
                                <option value='programming'>programming joke</option>
                                <option value='dark'>dark joke</option>
                                <option value='pun'>pun joke</option>
                                <option value='spooky'>spooky joke</option>
                                <option value='christmas'>christmas joke</option>
                                <option value='misc'>misc joke</option>
                            </select>
                        </label>
                        <label className='outer' htmlFor='getJokeShouldntBeSelector'>
                            It should not be:
                            <select className='inner' {...register("getJokeShouldntBeSelector")}>
                                <option value="">Select...</option>
                                <option value='nsfw'>Nsfw</option>
                                <option value='religious'>Religious</option>
                                <option value='political'>Political</option>
                                <option value='racist'>Racist</option>
                                <option value='sexist'>Sexist</option>
                                <option value='explicit'>Explicit</option>
                            </select>
                        </label>
                        <label className='outer' htmlFor='getNumberOfJokesSelector'>
                            <select className='long-selectbox' {...register("getNumberOfJokesSelector")}>
                                <option value="">Select...</option>
                                <option value='1'>Give me one good laugh!</option>
                                <option value='3'>Give me a couple laughs!</option>
                                <option value='5'>Feeling like pissing myself, give me a lot!</option>
                            </select>
                        </label>
                        <Button type="submit" text="Request Joke"/>
                    </>
                }
            </form>
        </>
    )
}

export default RequestJokeForm;