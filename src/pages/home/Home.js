import React, { useEffect } from 'react';
import styles from './Home.module.css';

function Home(){

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);

    return(
        <main className={styles.pageOuterContainer}>
            <div className={styles.pageInnerContainer}>
                Dit is de home pagina
            </div>
        </main>
    )
}

export default Home;