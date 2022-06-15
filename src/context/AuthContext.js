import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: {
            username: '',
        },
    });

    const history = useHistory();

    function login(token) {
        //const decodedToken = jwtDecode(token);
        //encoded token in de localstorage plaatsen
        localStorage.setItem('token', token);
        getData(token);
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('token');
        toggleAuth({
            isAuth: false,
            user: {
                username: '',
            },
        });
        history.push('/');
    }

    async function getData(token){
        try{
            const data = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(data);

            //decoded data gebruiken in de context
            toggleAuth({
                isAuth: true,
                user: {
                    username: data.data.username,
                },
            });
        }catch (e) {
            console.error(e);
        }

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