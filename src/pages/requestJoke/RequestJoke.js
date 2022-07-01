import React, {useContext, useEffect, useState} from 'react';
import './RequestJoke.css'
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {AuthContext} from '../../context/AuthContext';
import {chickenJokesArray} from '../../assets/ChickenJokesArray';
import RequestJokeForm from "../../components/forms/requestJoke/RequestJokeForm";

function RequestJoke() {
    const {isAuth, user: {username}} = useContext(AuthContext);
    const [isChickenButtonClicked, setIsChickenButtonClicked] = useState(false);
    const [isRealJokeButtonClicked, setIsRealJokeButtonClicked] = useState(false);
    const [index, setIndex] = useState(0)
    const [chickenPunchline, setChickenPunchline] = useState('');

    function getPunchlineButton() {
        setIsChickenButtonClicked(true);

        if (index < chickenJokesArray.length - 1) {
            setChickenPunchline(chickenJokesArray[index]);
            setIndex(index + 1);
        } else {
            setChickenPunchline(chickenJokesArray[index]);
            setIndex(0);
        }
    }

    function getRealJokeButton() {
        setIsRealJokeButtonClicked(true);
    }

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')
    }, []);

    return (
        <>
            <Header/>
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        {isChickenButtonClicked && !isRealJokeButtonClicked &&
                            <>
                                <h1>Why did the chicken cross the road?</h1>
                                <div className='chickenJoke'>
                                    <h3>{chickenPunchline}</h3>
                                    <div>
                                        <Button onClick={getPunchlineButton} text={"Haha! Give me an other one"}/>
                                        <Button onClick={getRealJokeButton} text={"Mwah, give me a real joke"}/>
                                    </div>
                                </div>
                            </>
                        }
                        {!isChickenButtonClicked &&
                            <>
                                <div className='jokeHeadline'>
                                    <h1>How about a joke, {username}</h1>
                                    <h4>The joker, 2019</h4>
                                </div>
                                <div className='chickenJoke'>
                                    <h3>Why did the chicken cross the road?</h3>
                                    <Button onClick={getPunchlineButton} text={"I don't know! Why?"}/>
                                </div>
                            </>
                        }
                        {isRealJokeButtonClicked &&
                            <RequestJokeForm/>
                        }
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default RequestJoke;