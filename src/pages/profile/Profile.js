import React, {useContext, useEffect} from 'react';
import styles from './Profile.css'
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Profile(){

    const {user: {username}} = useContext(AuthContext);

    function updateProfileButton(){
        console.log('Profile is updated')
    }
    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);

    return(
        <>
            <Header />
            <main>
                <section className="pageOuterContainer">
                    <div className="pageInnerContainer">
                        <h1>Hoi {username}</h1>
                        <p>Dit is de profiel pagina</p>
                        <Button onClick={updateProfileButton} text={'Update profile'} />
                    </div>
                </section>
            </main>
            <Footer text='Contact us!'/>
        </>
    )
}

export default Profile;