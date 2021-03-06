//React imports
import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

//3rd party imports
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Component imports
import ErrorMessage from '../components/errorMessage/ErrorMessage';

//Context imports
export const AuthContext = createContext({});


function AuthContextProvider({children}) {
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
            const data = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    email: data.data.email,
                    username: data.data.username,
                    info: data.data.info,
                },
                status: 'done',
            });

            if (url) {
                history.push(url);
            }
        } catch (e) {
            localStorage.removeItem('token');
            toggleIsAuth({
                isAuth: false,
                user: {
                    email: '',
                    username: '',
                    info: '',
                },
                status: 'done',
            });
        }
    }

    async function updateDateOfBirth(token) {
        try {

            const birthDateString = localStorage.getItem('birthDate');
            const data = await axios.put(
                "https://frontend-educational-backend.herokuapp.com/api/user",
                {
                    "info": birthDateString,
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            toggleIsAuth({
                ...isAuth,
                user: {
                    info: data.data.info,
                },

            })

            localStorage.removeItem('birthDate');
        } catch (e) {
            console.error('Birthdate is not updated, please contact administrator');
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
        updateDateOfBirth(token).then(
            () => {
                getUserData(token, './');
            }
        );
    }

    function logout() {

        localStorage.removeItem('token');
        toggleIsAuth({
            isAuth: false,
            user: {
                email: '',
                username: '',
                info: '',
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
            {isAuth.status === 'pending' && <ErrorMessage className='fieldLoadingMessage' message='Loading...'/>}
            {isAuth.status === 'error' &&
                <ErrorMessage className={'errorMessage'} message='An error has occurred, please refresh the page.'/>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;