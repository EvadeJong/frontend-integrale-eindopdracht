import React, {useState, useRef} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../button/Button";
import {useHistory} from "react-router-dom";


function UpdatePasswordForm() {

    const [updatedPassword, setUpdatedPassword] = useState('');
    const [repeatedUpdatedPassword, setRepeatedUpdatedPassword] = useState('');
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

    const {register, handleSubmit, formState: {errors}, watch} = useForm({});
    const password = useRef({});

    const history = useHistory();
    password.current = watch('password', '');

    async function updatePasswordRequest() {
        try {
            const token = localStorage.getItem('token');
            const data = await axios.put(
                'https://frontend-educational-backend.herokuapp.com/api/user',
                {
                    "password": updatedPassword,
                    "repeatedPassword": repeatedUpdatedPassword
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            setIsRequestSuccessful(true);
            console.log(`Password geupdated naar ${updatedPassword}`);
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
                <form className='updatedProfileForm' onSubmit={handleSubmit(updatePasswordRequest)}>
                    <div className='outerProfileGroup'>
                        <label htmlFor='updatedPassword'>
                            Password:
                        </label>
                        <input
                            name="password"
                            type="password"
                            {...register('password', {
                                required: "You must specify a password",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            })}
                            onChange={(e) => setUpdatedPassword(e.target.value)}
                        />
                        {errors.password && <p className='error'>{errors.password.message}</p>}
                    </div>
                    <div className='outerProfileGroup'>
                        <label htmlFor='profilePassword'>
                            Repeat password:
                        </label>
                        <input
                            name="password_repeat"
                            type="password"
                            {...register('password_repeat', {
                                validate: value =>
                                    value === password.current || "The passwords do not match"
                            })}
                            onChange={(e) => setRepeatedUpdatedPassword(e.target.value)}
                        />
                        {errors.password_repeat && <p className='error'>{errors.password_repeat.message}</p>}
                    </div>
                    <Button type='submit' text='Change password'/>
                </form>
            }
        </>
    )
}

export default UpdatePasswordForm;
