//3d party packages
import React, {useContext} from 'react';
import {Redirect, Route, Switch,} from 'react-router-dom';

//pages
import Home from './pages/home/Home.js';
import Contact from './pages/contact/Contact.js';
import Login from './pages/login/Login.js';
import Profile from './pages/profile/Profile.js';
import RequestJoke from './pages/requestJoke/RequestJoke.js'
import SubmitJoke from './pages/submitJoke/SubmitJoke.js'
import NotFound from './pages/notFound/NotFound.js';

//css
import './App.css';

//components
import {AuthContext} from './context/AuthContext';


function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/Contact'>
                    <Contact/>
                </Route>
                <Route exact path='/Login'>
                    <Login/>
                </Route>
                <Route exact path='/Profile'>
                    {isAuth ? <Profile/> : <Redirect to="/"/>}
                </Route>
                <Route exact path='/RequestJoke'>
                    {isAuth ? <RequestJoke/> : <Redirect to="/"/>}
                </Route>
                <Route exact path='/SubmitJoke'>
                    {isAuth ? <SubmitJoke/> : <Redirect to="/"/>}
                </Route>
                <Route component={NotFound} />
            </Switch>
        </>
    );
}

export default App;