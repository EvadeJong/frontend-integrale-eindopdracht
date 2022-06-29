import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {ReactComponent as Lips} from "../../assets/Lippen.svg";
import {ReactComponent as Giggles} from "../../assets/Giggles.svg";
import {AuthContext} from "../../context/AuthContext";
import './Header.css'

function Header() {
    const {isAuth, logout} = useContext(AuthContext);
    return (
        <header className="pageOuterContainer">
            <span className="pageInnerContainer">
                <span className='header-images'>
                    <span className='lips'>
                        <Lips/>
                    </span>
                    <span className='giggles'>
                        <Giggles/>
                    </span>
                </span>
                <nav>
                    <ul>
                        <li key='home'>
                            <NavLink to='/' exact activeClassName='active-link'>Home</NavLink>
                        </li>
                        {isAuth ?

                                <ul>
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
                                        <NavLink to='/' onClick={logout} exact activeClassName='active-link'>Logout</NavLink>
                                    </li>
                                </ul>
                            :
                            <li key='login'>
                                <NavLink to='/login' exact activeClassName='active-link'>Login</NavLink>
                            </li>
                        }
                    </ul>
                </nav>
            </span>
        </header>

    );
}

export default Header;