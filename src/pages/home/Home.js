import React, { useEffect, useContext } from 'react';
import styles from './Home.module.css';
import Button from "../../components/button/Button";
import { useHistory } from "react-router-dom";
import {ReactComponent as Icecream} from "../../assets/Icecream.svg";
import {AuthContext} from "../../context/AuthContext";

function Home(){
    const { isAuth, user: {username}} = useContext(AuthContext);
    let history = useHistory();

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);
    console.log(isAuth);

    return(
        <main className={styles.pageOuterContainer}>
            <Icecream className={styles.icecreamSvg}/>
            <div className={styles.pageInnerContainer}>
                {isAuth ?
                    <>
                        <h1>Welcome {username}</h1>
                    </>
                    :
                    <>
                    <h1>Welcome</h1>

                    <h2>
                    Giggles is an app that fetches funny (and really terrible) jokes  to put a smile on the reader's face.
                    Jokes may also be added to the database, with the aim of making other users laugh.
                    Giggles main goal is to make people happy, make them smile and forget about any worries for a while.
                    </h2>

                    <Button onClick={() => history.push('/login')}  text={'Register'} />
                    </>
                }
            </div>
        </main>
    )
}

export default Home;