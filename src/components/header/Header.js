import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Header.css';
import {ReactComponent as Lips} from "../../assets/Lippen.svg";
import {ReactComponent as Giggles} from "../../assets/Giggles.svg";
import {AuthContext} from "../../context/AuthContext";

function Header() {
    const { isAuth, logout } = useContext(AuthContext);
    return (
        <header className="pageOuterContainer">
            <div className="pageInnerContainer">
                <div className='header-images'>
                    <div className='lips'>
                        <Lips />
                    </div>
                    <div className='giggles'>
                        <Giggles />
                    </div>
                    <nav>
                        <ul>
                            { isAuth &&
                                <>
                                    <ul>
                                        <li key='requestJoke'>
                                            <NavLink to='/requestJoke' exact activeClassName={styles['active-link']}>Giggler</NavLink>
                                        </li>
                                        <li key='submitJoke'>
                                            <NavLink to='/submitJoke' exact activeClassName={styles['active-link']}>Joker</NavLink>
                                        </li>
                                        <li key='logout'>
                                            <NavLink to='/' onClick={logout} activeClassName={styles['active-link']}>Logout</NavLink>
                                        </li>
                                    </ul>
                                </>
                            }
                            <li key='home'>
                                <NavLink to='/' exact activeClassName={styles['active-link']}>Home</NavLink>
                            </li>
                            {!isAuth &&
                                <li key='login'>
                                    <NavLink to='/login' activeClassName={styles['active-link']}>Login</NavLink>
                                </li>
                            }
                        </ul>
                    </nav>
                </div>


            </div>
        </header>

    );
}

export default Header;