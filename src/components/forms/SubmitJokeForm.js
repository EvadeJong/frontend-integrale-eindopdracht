import React, {useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";
import './SubmitJokeForm.css'

function SubmitJokeForm(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            jokeAboutSelector: '',
            jokeConsistOfSelector: '',
            jokeIsSelector: '',
            textfieldJoke: ''
        }
    });

    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);


    async function submitJokeRequest(data) {

        try {
           console.log(data);

        } catch (e) {
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

    return(

        <>
            <form className='submitJokeForm' onSubmit={handleSubmit(submitJokeRequest)}>
                {isRequestSuccessful ?
                    <h3>Thank you for submitting your joke!</h3>
                    :
                    <>
                        <h3>Let's find out!</h3>
                        <label className='outer' htmlFor='jokeAboutSelector'>
                            My joke is about:
                            <select className='inner' {...register('jokeAboutSelector')}>
                                <option value="">Select...</option>
                                <option value='programming'>Programming</option>
                                <option value='dark'>Dark</option>
                                <option value='pun'>Pun</option>
                                <option value='spooky'>Spooky</option>
                                <option value='christmas'>Christmas</option>
                                <option value='misc'>Misc</option>
                            </select>
                        </label>
                        <label className='outer' htmlFor='jokeConsistOfSelector'>
                        And consists of:
                        <select className='inner' {...register("jokeConsistOfSelector")}>
                            <option value="">Select...</option>
                            <option value="one-part">One part</option>
                            <option value="two-part">Two parts</option>
                        </select>
                        </label>
                        <label className='outer' htmlFor='jokeIsSelector'>
                        I consider my joke to be:
                        <select className='inner' {...register("jokeIsSelector")}>
                            <option value="">Select...</option>
                            <option value='nsfw'>Nsfw</option>
                            <option value='religious'>Religious</option>
                            <option value='political'>Political</option>
                            <option value='racist'>Racist</option>
                            <option value='sexist'>Sexist</option>
                            <option value='explicit'>Explicit</option>
                        </select>
                        </label>
                        <label className='outer' htmlFor='textfieldJoke'>
                            The actual joke is:
                        <textarea className='inner' {...register("textfieldJoke")}></textarea>
                        </label>
                        <Button type="submit" text="Submit Joke"/>
                    </>
                }
            </form>
        </>
    )
}

export default SubmitJokeForm;