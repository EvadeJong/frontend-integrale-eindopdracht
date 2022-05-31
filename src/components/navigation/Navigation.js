import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Navigation.css';

function Navigation() {

    return (
        <>
            <nav>
                <ul>
                    <li key='requestJoke'>
                        <NavLink to='/requestJoke' exact activeClassName={styles['active-link']}>Giggler</NavLink>
                    </li>
                    <li key='submitJoke'>
                        <NavLink to='/submitJoke' exact activeClassName={styles['active-link']}>Joker</NavLink>
                    </li>
                    <li key='home' className={styles.right}>
                        <NavLink to='/' exact activeClassName={styles['active-link']}>Home</NavLink>
                    </li>
                    <li key='login' className={styles.right}>
                        <NavLink to='/login' activeClassName={styles['active-link']}>Login</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;