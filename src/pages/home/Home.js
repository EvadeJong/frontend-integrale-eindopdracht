import React, { useEffect } from 'react';
import styles from './Home.module.css';
import Button from "../../components/button/Button";
import { useHistory } from "react-router-dom";
import {ReactComponent as Icecream} from "../../assets/Icecream.svg";

function Home(){

    let history = useHistory();

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);


    return(
        <main className={styles.pageOuterContainer}>
            <Icecream />
            <div className={styles.pageInnerContainer}>

                <h1>Welcome</h1>

                    <h2>
                        Giggles is an app that fetches funny (and really terrible) jokes  to put a smile on the reader's face. <br />
                        Jokes may also be added to the database, with the aim of making other users laugh.<br />
                        Giggles main goal is to make people happy, make them smile and forget about any worries for a while.
                    </h2>

                <Button onClick={() => history.push('/login')}  text={'Register'} />
            </div>
        </main>
    )
}

export default Home;