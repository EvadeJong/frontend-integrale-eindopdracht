import React, {useContext, useEffect, useState} from 'react';
import styles from './Profile.css'
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {useForm} from "react-hook-form";

function Profile() {

    const {user: {username, email, password}} = useContext(AuthContext);
    const [isDisabled, toggleIsDisabled] = useState(true)
    function changeProfileRequest() {
        toggleIsDisabled(false);
        console.log('Profile is updated')
    }

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur',
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);

    return (
        <>
            <Header/>
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        <h1>Hi {username}</h1>
                        {isDisabled ?
                            <>
                            <h3>You can inspect your personal data here</h3>
                            <form className='profileForm' onSubmit={handleSubmit(changeProfileRequest)}>
                                <div className='outerProfileGroup'>
                                    <label htmlFor='profileUsername'>
                                        Username:
                                    </label>
                                    <input
                                        type='text'
                                        id='profileUsername'
                                        disabled
                                        value={username}
                                    />
                                </div>
                                <div className='outerProfileGroup'>
                                    <label htmlFor='profileEmail'>
                                        E-mail:
                                    </label>
                                    <input
                                        type='email'
                                        id='profileEmail'
                                        disabled
                                        value={email}
                                    />
                                </div>
                                <div className='outerProfileGroup'>
                                    <label htmlFor='profilePassword'>
                                        Password:
                                    </label>
                                    <input
                                        type='password'
                                        id='profilePassword'
                                        disabled
                                        value='*********'
                                    />
                                </div>
                                <Button type='submit' text={'Update profile'}/>
                            </form>
                            </>
                            :
                            <>
                                <h3>You can change your personal data here</h3>
                                <form className='profileForm' onSubmit={handleSubmit(changeProfileRequest)}>
                                    <div className='outerProfileGroup'>
                                        <label htmlFor='profileUsername'>
                                            Username:
                                        </label>
                                        <input
                                            type='text'
                                            id='profileUsername'
                                            value={username}
                                        />
                                    </div>
                                    <div className='outerProfileGroup'>
                                        <label htmlFor='profileEmail'>
                                            E-mail:
                                        </label>
                                        <input
                                            type='email'
                                            id='profileEmail'
                                            value={email}
                                        />
                                    </div>
                                    <div className='outerProfileGroup'>
                                        <label htmlFor='profilePassword'>
                                            Password:
                                        </label>
                                        <input
                                            type='password'
                                            id='profilePassword'
                                            value='*********'
                                        />
                                    </div>
                                    <Button type='submit' text={'Save changes'}/>
                                </form>
                            </>
                        }
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default Profile;