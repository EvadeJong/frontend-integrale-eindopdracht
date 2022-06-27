import React, {useState, useContext, useRef} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import './SubmitJokeForm.css'
import {AuthContext} from "../../context/AuthContext";


function UpdateEmailForm() {

    const {user: {email}} = useContext(AuthContext);
    const [updatedEmail, setUpdatedEmail] = useState(email);
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({});

    async function updateEmailRequest() {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                'https://frontend-educational-backend.herokuapp.com/api/user',
                {
                    "email": updatedEmail,
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            console.log(`Email geupdated naar ${updatedEmail}`);

            setIsRequestSuccessful(true);

        } catch (e) {
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

    return (
        <>
            {isRequestSuccessful ?
                <>
                    <h3>Your info is successfully updated</h3>
                    <Button type='button' text='Back to profile' onClick={() => window.location.reload(true)} />
                </>
                :
                <form className='updatedProfileForm' onSubmit={handleSubmit(updateEmailRequest)}>
                    <div className='outerProfileGroup'>
                        <label htmlFor='updatedEmail'>
                            E-mail:
                        </label>
                        <input
                            type='email'
                            id='updatedEmail'
                            defaultValue={email}
                            {...register('updatedEmail',
                                {
                                    required: 'Email can not be empty',
                                })
                            }
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                        />
                        {errors.updatedEmail && <p className='error'>{errors.updatedEmail.message}</p>}
                    </div>
                    <Button type='submit' text='Update email'/>
                </form>
            }
        </>
    )
}

export default UpdateEmailForm;
