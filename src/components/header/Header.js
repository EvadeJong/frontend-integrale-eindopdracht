import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Header.module.css';
import {ReactComponent as Lips} from "../../assets/Lippen.svg";
import {ReactComponent as Giggles} from "../../assets/Giggles.svg";

function Header() {

    return (
        <header className={styles.headerOuterContainer}>
            <div className={styles.headerInnerContainer}>
                <Lips />
                <Giggles />
                <nav>
                    <ul>
                        <li key='requestJoke'>
                            <NavLink to='/requestJoke' exact activeClassName={styles['active-link']}>Giggler</NavLink>
                        </li>
                        <li key='submitJoke'>
                            <NavLink to='/submitJoke' exact activeClassName={styles['active-link']}>Joker</NavLink>
                        </li>
                        <li key='home'>
                            <NavLink to='/' exact activeClassName={styles['active-link']}>Home</NavLink>
                        </li>
                        <li key='login'>
                            <NavLink to='/login' activeClassName={styles['active-link']}>Login</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    );
}

export default Header;