import React, { useEffect } from 'react';
import styles from './Home.module.css';
import Button from "../../components/button/Button";
import { useHistory } from "react-router-dom";

function Home(){

    let history = useHistory();

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);


    return(
        <main className={styles.pageOuterContainer}>
            <div className={styles.pageInnerContainer}>
                Dit is de home pagina
                <Button onClick={() => history.push('/login')}  text={'Register'} />
            </div>
        </main>
    )
}

export default Home;