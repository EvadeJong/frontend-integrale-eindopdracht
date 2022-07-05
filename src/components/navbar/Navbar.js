import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import './Navbar.css'

function Navbar() {
    const {isAuth, logout} = useContext(AuthContext);
    const history = useHistory();

    return (
                <nav>
                    <ul>

                        {isAuth &&
                            <>
                                <li key='requestJoke'>
                                    <NavLink to='/requestJoke' exact activeClassName='active-link'>Giggler</NavLink>
                                </li>
                                <li key='submitJoke'>
                                    <NavLink to='/submitJoke' exact activeClassName='active-link'>Joker</NavLink>
                                </li>
                                <li key='profile'>
                                    <NavLink title='Profile' to='/profile' exact activeClassName='active-link'>
                                        <i className="fa-solid fa-user fa-lg"></i>
                                    </NavLink>
                                </li>
                            </>
                            }
                            { history.location.pathname !== '/login' && !isAuth &&
                            <li key='login'>
                                <NavLink to='/login' exact activeClassName='active-link'>Login</NavLink>
                            </li>
                            }
                        <li key='home'>
                            <NavLink title='Home' to='/' exact activeClassName='active-link'>
                                <i className="fa-solid fa-house fa-lg"></i>
                            </NavLink>
                        </li>
                        {isAuth &&
                            <li key='logout'>
                                <NavLink title='Log out' to='/' onClick={logout}><i className="fa-solid fa-right-from-bracket fa-lg"></i></NavLink>
                            </li>
                        }
                    </ul>
                </nav>

    );
}

export default Navbar;