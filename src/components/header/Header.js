import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Header.module.css';
import {ReactComponent as Lips} from "../../assets/Lippen.svg";
import {ReactComponent as Giggles} from "../../assets/Giggles.svg";
import {AuthContext} from "../../context/AuthContext";

function Header() {
    const { isAuth, logout } = useContext(AuthContext);
    return (
        <header className={styles.headerOuterContainer}>
            <div className={styles.headerInnerContainer}>
                <Lips />
                <Giggles />
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
        </header>

    );
}

export default Header;