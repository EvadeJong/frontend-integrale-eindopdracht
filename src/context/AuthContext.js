import React, {createContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const history = useHistory();
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: {
            username: '',
        },
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(token) {
            const tokenIsValid = jwtValidator(jwtDecode(token));
            if (tokenIsValid) {
                getUserData(token);
            }
        }else {
            toggleAuth({
                ...auth,
                status: 'done',
            });
        }
    },[]);

    async function getUserData(token) {
        try {
            const data = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            toggleAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: data.data.username,
                },
                status: 'done',
            })
        } catch (e) {
            console.error(e);
            localStorage.removeItem('token');
            toggleAuth({
                ...auth,
                status: 'error',
            });
        }
    }

    function jwtValidator (decodedToken) {
        const now = Date.now().valueOf() / 1000
        if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now) {
            console.log(`token expired: ${JSON.stringify(decodedToken)}`);
            return false;
        }else{
            return true;
        }
    }

    function login(token) {
        //const decodedToken = jwtDecode(token);
        //encoded token in de localstorage plaatsen
        localStorage.setItem('token', token);
        getUserData(token);
        history.push('/');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('token');
        toggleAuth({
            isAuth: false,
            user: {
                username: '',
            },
            status: 'done',
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
            {auth.status === 'done' && children}
            {auth.status === 'pending' && <p>Loading...</p>}
            {auth.status === 'error' && <p className='error'>An error has occurred, please refresh the page.</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;