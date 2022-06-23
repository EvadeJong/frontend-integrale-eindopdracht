import React, { useEffect, useContext } from 'react';
import './Home.css';
import Button from "../../components/button/Button";
import { useHistory } from "react-router-dom";
import {ReactComponent as Icecream} from "../../assets/Icecream.svg";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Home(){
    const { isAuth, user: {username}} = useContext(AuthContext);
    let history = useHistory();

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);

    return(
        <>
            <Header />
            <main>
            <section className="pageOuterContainer">
                <div className="pageInnerContainer">
                    {isAuth ?
                        <article className='Welcome'>
                            <h1>Welcome {username}</h1>
                            <h3>
                                Nice to see you again! Are you ready to piss your pants while laughing out loud?
                                Click on menu tab 'Giggler' if you want to see some great jokes.
                                Do you have a joke yourself? Submit it using the 'Joker' tab.
                            </h3>
                            <h4>
                                (Don’t worry, we won’t tell)
                            </h4>
                        </article>
                        :
                        <article className='Welcome'>
                            <h1>Welcome</h1>
                            <h3>
                            Giggles is an app that fetches funny (and really terrible) jokes  to put a smile on the reader's face.
                            Jokes may also be added to the database, with the aim of making other users laugh.
                            Giggles main goal is to make people happy, make them smile and forget about any worries for a while.
                            </h3>
                        </article>
                    }
                    <div className='homepage-lower'>
                        <Icecream className="icecreamSvg"/>
                        {!isAuth &&
                            <div className='registerButton'>
                                <Button onClick={() => history.push('/login')}  text={'Register'} />
                            </div>
                        }
                    </div>
                </div>
            </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default Home;