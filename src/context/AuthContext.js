import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    useEffect(() => {
        const token = localStorage.getItem('token');
        // als er een token in de localStorage staat, decoderen we hem en kijken we of hij nog geldig is
        if(token) {
            const decoded = jwtDecode(token);
            const tokenIsValid = jwtValidator(decoded);
            console.log(tokenIsValid);
            if (tokenIsValid) {
                getUserData(token);
                // als de token niet geldig is halen we hem uit de localStorage
            } else{
                localStorage.removeItem('token');
                toggleAuth({
                    isAuth: false,
                    user: {
                        username: '',
                    },
                    status: 'done',
                })
            }
            //als er geen token is, is de user niet geauthentiseerd
        }else{
            toggleAuth({
                isAuth: false,
                user: {
                    username: '',
                },
                status: 'done',
            });
        }
    },[]);

    const history = useHistory();

    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    async function getUserData(token, url) {
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
                    email: data.data.email,
                    username: data.data.username,
                },
                status: 'done',
            });

            if (url) {
                history.push(url);
            }
        } catch (e) {
            localStorage.removeItem('token');
            toggleAuth({
                ...auth,
                user: null,
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
        // token in de localstorage plaatsen
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        getUserData(token, '/');
    }

    function logout() {

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