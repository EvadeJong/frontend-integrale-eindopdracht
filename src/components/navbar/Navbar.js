import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import './Navbar.css'

function Navbar() {
    const {isAuth, logout} = useContext(AuthContext);

    return (
                <nav>
                    <ul>
                        <li key='home'>
                            <NavLink to='/' exact activeClassName='active-link'>Home</NavLink>
                        </li>
                        {isAuth ?
                            <>
                                <li key='requestJoke'>
                                    <NavLink to='/requestJoke' exact activeClassName='active-link'>Giggler</NavLink>
                                </li>
                                <li key='submitJoke'>
                                    <NavLink to='/submitJoke' exact activeClassName='active-link'>Joker</NavLink>
                                </li>
                                <li key='profile'>
                                    <NavLink to='/profile' exact activeClassName='active-link'>Profile</NavLink>
                                </li>
                                <li key='logout'>
                                    <NavLink to='/' onClick={logout} >Logout</NavLink>
                                </li>
                            </>
                            :
                            <li key='login'>
                                <NavLink to='/login' exact activeClassName='active-link'>Login</NavLink>
                            </li>
                        }
                    </ul>
                </nav>

    );
}

export default Navbar;