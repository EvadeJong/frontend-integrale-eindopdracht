//React imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";

//Page imports
import App from './App';

//3rd party imports
import reportWebVitals from './reportWebVitals';

//Context imports
import AuthContextProvider from "./context/AuthContext";
import ChickenJokeSeenProvider from "./context/ChickenJokeSeenContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <React.StrictMode>
            <AuthContextProvider>
                <ChickenJokeSeenProvider>
                    <App/>
                </ChickenJokeSeenProvider>
            </AuthContextProvider>
        </React.StrictMode>
    </Router>
);

reportWebVitals();
