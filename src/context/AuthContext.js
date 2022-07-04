import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
        const [isAuth, toggleIsAuth] = useState({
            isAuth: false,
            user: null,
            status: 'pending',
        });
        const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // als er een token in de localStorage staat, decoderen we hem en kijken we of hij nog geldig is
        if (token) {
            const decoded = jwtDecode(token);
            const tokenIsValid = jwtValidator(decoded);

            if (tokenIsValid) {
                getUserData(token);
                // als de token niet geldig is halen we hem uit de localStorage
            } else {
                localStorage.removeItem('token');
                toggleIsAuth({
                    isAuth: false,
                    user: {
                        email: '',
                        username: '',
                    },
                    status: 'done',
                });
            }
            //als er geen token is, is de user niet geauthentiseerd
        } else {
            toggleIsAuth({
                isAuth: false,
                user: {
                    email: '',
                    username: '',
                },
                status: 'done',
            })
        }
    }, []);


    async function getUserData(token, url) {
        try {
            const data = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            toggleIsAuth({
                ...isAuth,
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
            console.log(e);
            localStorage.removeItem('token');
            toggleIsAuth({
                isAuth: false,
                user: {
                    email: '',
                    username: '',
                },
                status: 'done',
            });
        }
    }

    function jwtValidator(decodedToken) {
        const now = Date.now().valueOf() / 1000
        if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now) {
            console.log(`token expired: ${JSON.stringify(decodedToken)}`);
            return false;
        } else {
            return true;
        }
    }

    function login(token) {
        // token in de localstorage plaatsen
        localStorage.setItem('token', token);
        getUserData(token, './');
    }

    function logout() {

        localStorage.removeItem('token');
        toggleIsAuth({
            isAuth: false,
            user: {
                email: '',
                username: '',
            },
            status: 'done',
        });
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' && children}
            {isAuth.status === 'pending' && <ErrorMessage className='fieldLoadingMessage' message='Loading...' />}
            {isAuth.status === 'error' && <ErrorMessage className={'errorMessage'} message='An error has occurred, please refresh the page.'/>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;