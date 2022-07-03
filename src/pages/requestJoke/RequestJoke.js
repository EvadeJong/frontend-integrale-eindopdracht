import React, {useContext, useEffect, useState} from 'react';
import './RequestJoke.css'
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {chickenJokesArray} from '../../assets/ChickenJokesArray';
import RequestJokeForm from "../../components/forms/requestJoke/RequestJokeForm";
import ContentContainer from "../../components/contentContainer/ContentContainer";

function RequestJoke() {

    //TODO isChickenButtonClicked in de context plaatsen zodat een gebruiker alleen de eerste keer door het menu gaat
    //TODO in useEffect toetsten of de pagina al eerder bezocht is onMount
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
                        { isChickenButtonClicked && !isRealJokeButtonClicked &&
                            <>
                                <ContentContainer
                                    subtitle= 'Why did the chicken cross the road?'
                                    content= {chickenPunchline}
                                />
                                <span className='buttonGroup'>
                                        <Button onClick={getPunchlineButton} text={"Haha! Give me an other one"}/>
                                        <Button onClick={getRealJokeButton} text={"Mwah, give me a real joke"}/>
                                </span>
                            </>
                        }
                        {!isChickenButtonClicked &&
                            <>
                                <ContentContainer
                                    title= 'How about a joke'
                                    content='Why did the chicken cross the road?'
                                    />
                                <Button onClick={getPunchlineButton} text={"I don't know! Why?"}/>
                            </>

                        }
                        {isRealJokeButtonClicked &&
                            <>
                            <RequestJokeForm/>
                            </>
                        }
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default RequestJoke;