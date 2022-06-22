import React, { useEffect, useContext } from 'react';
import styles from './Home.css';
import Button from "../../components/button/Button";
import { useHistory } from "react-router-dom";
import {ReactComponent as Icecream} from "../../assets/Icecream.svg";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";

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
                    <>
                        <main>
                        <h1>Welcome {username}</h1>
                        <section>
                            Nice to see you again! Are you ready to piss your pants while laughing out loud?
                        </section>
                        <section>
                            (Don’t worry, we won’t tell)
                        </section>
                        </main>
                    </>
                    :
                    <>
                        <main>
                        <h1>Welcome</h1>

                        <section>
                        Giggles is an app that fetches funny (and really terrible) jokes  to put a smile on the reader's face.
                        Jokes may also be added to the database, with the aim of making other users laugh.
                        Giggles main goal is to make people happy, make them smile and forget about any worries for a while.
                        </section>

                        <Button onClick={() => history.push('/login')}  text={'Register'} />
                        <Icecream className={styles.icecreamSvg}/>
                        </main>
                    </>
                }
            </div>
            </section>
            </main>
        </>
    )
}

export default Home;