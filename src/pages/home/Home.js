import React, { useEffect } from 'react';
import styles from './Home.css';

function Home(){

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);

    return(
        <main className="page-outer-container">
            <div className="page-inner-container">
                <p>Dit is de home pagina</p>
            </div>
        </main>
    )
}

export default Home;