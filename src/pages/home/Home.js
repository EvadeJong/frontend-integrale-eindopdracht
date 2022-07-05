import React, {useContext, useEffect} from 'react';
import './Home.css';
import {ReactComponent as Icecream} from "../../assets/images/Icecream.svg";
import {ReactComponent as Milkshake} from "../../assets/images/Milkshake.svg";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ContentContainer from "../../components/contentContainer/ContentContainer";
import Button from "../../components/button/Button";
import {useHistory} from "react-router-dom";

function Home() {
    const {isAuth} = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);

    return (
        <>
            <Header/>
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        {isAuth ?
                        <ContentContainer
                            title = 'Welcome'
                            content ='Nice to see you again! Are you ready to piss your pants while laughing out loud?
                                      Click on menu tab "Giggler" if you want to see some great jokes.
                                      Do you have a joke yourself? Submit it using the "Joker" tab.'
                            subcontent ='(Don’t worry, we won’t tell)'
                        />
                        :
                            <>
                                <ContentContainer
                                    title= 'Welcome!'
                                    content='Giggles is an app that fetches funny (and really terrible) jokes to put a smile on
                                        the readers face.Jokes may also be added to the database, with the aim of making other
                                        users laugh. Giggles main goal is to make people happy, make them smile and forget about any
                                        worries for a while.
                                        Click on menu tab "Giggler" if you want to see some great jokes.
                                        Do you have a joke yourself? Submit it using the "Joker" tab.'
                                />
                                <Button onClick={() => history.push('/login')} text={'Register'}/>
                            </>
                        }
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default Home;