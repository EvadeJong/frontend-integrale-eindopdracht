import React, {useContext, useEffect, useState} from 'react';
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UpdatePasswordForm from "../../components/forms/updateProfile/UpdatePasswordForm";
import UpdateEmailForm from "../../components/forms/updateProfile/UpdateEmailForm";
import ContentContainer from "../../components/contentContainer/ContentContainer";

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
                        <ContentContainer
                            title='Hi'
                            content='You can change your personal data here'
                        />
                            {changeEmailRequest === false && changePasswordRequest === false &&
                            <span className='currentProfileInfo'>
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
                                <span className='buttonGroup'>
                                    <Button type='button' text='Update password'
                                        onClick={() => toggleChangePasswordRequest(!changePasswordRequest)} />
                                     <Button type='button' text='Update email'
                                        onClick={() => toggleChangeEmailRequest(!changeEmailRequest)} />
                                </span>
                            </span>
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