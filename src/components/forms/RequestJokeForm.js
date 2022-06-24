import React, {useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './RequestJokeForm.css'

function RequestJokeForm(){
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

    useEffect(() => {
        reset({
            getJokeAboutSelector: '',
            getJokeShouldntBeSelector: '',
            getNumberOfJokesSelector: '',
        })
    }, [isRequestSuccessful])

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
            {isRequestSuccessful ?
                <>
                    <h3>Joke requested successfully</h3>
                    <Button type='submit' text='I want another joke' onClick={ newRequest }/>
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
                                I want the subject of the joke to be:
                            </label>
                            <select {...register('getJokeAboutSelector')}>
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
                        <div className='outerRequestJoke'>
                                <label htmlFor='getJokeShouldntBeSelector'>
                                        It should not be:
                                    </label>
                                <select {...register("getJokeShouldntBeSelector")}>
                                        <option value="">Select...</option>
                                        <option value='nsfw'>Nsfw</option>
                                        <option value='religious'>Religious</option>
                                        <option value='political'>Political</option>
                                        <option value='racist'>Racist</option>
                                        <option value='sexist'>Sexist</option>
                                        <option value='explicit'>Explicit</option>
                                    </select>
                            </div>
                        <div className='outerRequestJoke'>
                                <label htmlFor='getNumberOfJokesSelector'>
                                    Give me:
                                </label>
                                <select {...register('getNumberOfJokesSelector')}>
                                        <option value=''>Select...</option>
                                        <option value='1'>one good laugh!</option>
                                        <option value='3'>a couple laughs!</option>
                                        <option value='5'>a lot of jokes, wanna ROFL!</option>
                                    </select>
                            </div>
                        <Button type='submit' text='Request Joke'/>
                    </form>
                </>
            }
        </>
    )
}

export default RequestJokeForm;