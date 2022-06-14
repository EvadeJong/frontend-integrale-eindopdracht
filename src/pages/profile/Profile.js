import React, {useEffect} from 'react';
import styles from './Profile.module.css'
import Button from "../../components/button/Button";

function Profile(){

    function updateProfileButton(){
        console.log('Profile is updated')
    }
    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);

    return(
        <main>
            <div>
                <p>Dit is de profiel pagina</p>
                <Button onClick={updateProfileButton} text={'Update profile'} />
            </div>
        </main>
    )
}

export default Profile;