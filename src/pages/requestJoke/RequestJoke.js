import React, {useEffect, useState, useContext} from 'react';
import './RequestJoke.css'
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {chickenJokesArray} from '../../assets/ChickenJokesArray';
import RequestJokeForm from "../../components/forms/requestJoke/RequestJokeForm";
import ContentContainer from "../../components/contentContainer/ContentContainer";
import {ChickenJokeSeenContext} from '../../context/ChickenJokeSeenContext';


function RequestJoke() {

    const [isRealJokeButtonClicked, setIsRealJokeButtonClicked] = useState(false);
    const [index, setIndex] = useState(0)
    const [chickenPunchline, setChickenPunchline] = useState('');
    const [showWhy, setShowWhy] = useState(false);

    const { toggleChickenJoke, isChickenJokeSeen } = useContext(ChickenJokeSeenContext);

    function getPunchlineButton() {
        setShowWhy(true);
        if (index < chickenJokesArray.length - 1) {
            setChickenPunchline(chickenJokesArray[index]);
            setIndex(index + 1);
        } else {
            setChickenPunchline(chickenJokesArray[index]);
            setIndex(0);
        }
    }

    function getRealJokeButton() {
        toggleChickenJoke(true);
        setIsRealJokeButtonClicked(true);
    }

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#BFD7EA')

        return function cleanup(){

        }
    }, []);


    return (
        <>
            <Header/>
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        {!isChickenJokeSeen && showWhy && !isRealJokeButtonClicked &&
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
                        {!isChickenJokeSeen && !showWhy &&
                            <>
                                <ContentContainer
                                    title= 'How about a joke'
                                    content='Why did the chicken cross the road?'
                                    />
                                <Button onClick={getPunchlineButton} text={"I don't know! Why?"}/>
                            </>

                        }
                        {isChickenJokeSeen &&
                            <>
                                <RequestJokeForm />
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