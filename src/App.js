//3d party packages
import React, {useContext, useState} from 'react';
import {
    Switch,
    Route, Redirect,
} from 'react-router-dom';

//pages
import Home from './pages/home/Home.js';
import Contact from './pages/contact/Contact.js';
import Login from './pages/login/Login.js';
import Profile from './pages/profile/Profile.js';
import RequestJoke from './pages/requestJoke/RequestJoke.js'
import SubmitJoke from './pages/submitJoke/SubmitJoke.js'

//components
import Header from './components/header/Header.js'
import Footer from './components/footer/Footer.js'
import {AuthContext} from "./context/AuthContext";


function App() {
  const { isAuth } = useContext(AuthContext);

  return (
      <>
        <Header />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/Contact'>
                <Contact />
              </Route>
                <Route exact path='/Login'>
                    <Login />
                </Route>
                <Route exact path='/Profile'>
                    {isAuth ? <Profile /> : <Home />}
                </Route>
                <Route exact path='/RequestJoke'>
                    {isAuth ? <RequestJoke /> : <Redirect to="/" />}
                </Route>
                <Route exact path='/submitJoke'>
                    {isAuth ? <SubmitJoke /> : <Redirect to="/" />}
                </Route>
              </Switch>
          <Footer />
      </>
  );
}

export default App;