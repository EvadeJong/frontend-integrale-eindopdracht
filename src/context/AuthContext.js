import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
    });

    const history = useHistory();

    function login(token) {
        console.log(token);

        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        //encoded token in de localstorage plaatsen
        localStorage.setItem('token', token);

        //haal meer gebruikerdata op uit de backend
        //async function getData(){
        //      try{
        //          const response = await axios.get('');
        //             login(response);
        //         }catch (e) {
        //             console.error(e);
        //         }


        //decoded data gebruiken in de context
        toggleAuth({
            isAuth: true,
            user: {
                username: decodedToken.sub,
                email: decodedToken.email,
            },
        });
        console.log(decodedToken.sub);
        history.push('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        toggleAuth({
            isAuth: false,
            user: null,
        });
        history.push('/');
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;