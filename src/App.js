//3d party packages
import React, { useState } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

//pages
import Home from './pages/home/Home.js';
import Contact from './pages/contact/Contact.js';
import Login from './pages/login/Login.js';
import Profile from './pages/profile/Profile.js';
import RequestJoke from './pages/requestJoke/RequestJoke.js'
import SubmitJoke from './pages/submitJoke/SubmitJoke.js'
//components
import PrivateRoute from './components/privateRoute/PrivateRoute.js'
import Header from './components/header/Header.js'
import Footer from './components/footer/Footer.js'


function App() {
  const [ isAuthenticated, toggleIsAuthenticated ] = useState(false);

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
            <Route exact path='/Login' >
                <Login login={isAuthenticated} getter={isAuthenticated} setter={toggleIsAuthenticated}/>
            </Route>
            <PrivateRoute exact path='/Profile' login={isAuthenticated}>
                <Profile />
            </PrivateRoute>
            <PrivateRoute exact path='/RequestJoke' login={isAuthenticated}>
                <RequestJoke />
            </PrivateRoute>
            <PrivateRoute exact path='/submitJoke' login={isAuthenticated}>
                <SubmitJoke />
            </PrivateRoute>
        </Switch>
          <Footer />
      </>
  );
}

export default App;