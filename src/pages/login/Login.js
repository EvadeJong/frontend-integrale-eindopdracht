//React imports
import React, {useEffect} from 'react';

//CSS imports
import './Login.css';

//Component imports
import LoginForm from '../../components/forms/login/LoginForm';
import Header from '../../components/header/Header';
import RegisterForm from '../../components/forms/register/RegisterForm';
import Footer from '../../components/footer/Footer';

function Login() {

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')
    }, []);

    return (
        <>
            <Header/>
            <main>
                <section className='pageOuterContainer'>
                    <div className='pageInnerContainer'>
                            <span className='seperator'>
                              <div className='loginpage-left'>
                                <LoginForm/>
                              </div>

                              <div className='seperator-line'>
                              </div>

                              <div className='registerpage-right'>
                                <RegisterForm/>
                              </div>
                            </span>
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default Login;