import React, {useContext, useEffect, useState} from 'react';
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UpdatePasswordForm from "../../components/forms/UpdatePasswordForm";
import UpdateEmailForm from "../../components/forms/UpdateEmailForm";

function Profile() {

    const {user: {username, email}} = useContext(AuthContext);
    const [changeEmailRequest, toggleChangeEmailRequest] = useState(false);
    const [changePasswordRequest, toggleChangePasswordRequest] = useState(false);

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
                        <h3>You can change your personal data here</h3>
                        {changeEmailRequest === false && changePasswordRequest === false &&
                            <form className='currentProfileInfo'>
                                <div className='outerProfileGroup'>
                                    <label htmlFor='profileUsername'>
                                        Username:
                                    </label>
                                    <input
                                        type='text'
                                        id='username'
                                        defaultValue={username}
                                        disabled
                                    />
                                </div>
                                <div className='outerProfileGroup'>
                                    <label htmlFor='profileUsername'>
                                        Email:
                                    </label>
                                    <input
                                        type='text'
                                        id='email'
                                        defaultValue={email}
                                        disabled
                                    />
                                </div>
                                <div className='outerProfileGroup'>
                                    <label htmlFor='profileUsername'>
                                        Password:
                                    </label>
                                    <input
                                        type='password'
                                        id='password'
                                        defaultValue='********'
                                        disabled
                                    />
                                </div>
                                <Button type='button' text='Update password'
                                        onClick={() => toggleChangePasswordRequest(!changePasswordRequest)}></Button>
                                <Button type='button' text='Update email'
                                        onClick={() => toggleChangeEmailRequest(!changeEmailRequest)}></Button>
                            </form>
                        }
                        {changePasswordRequest &&
                            <UpdatePasswordForm/>
                        }
                        {changeEmailRequest &&

                            <UpdateEmailForm/>
                        }

                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default Profile;