import React, {useEffect} from 'react';

function Profile(){

    useEffect (() =>{
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E')
    }, []);

    return(
        <p>Dit is de profiel pagina</p>
    )
}

export default Profile;