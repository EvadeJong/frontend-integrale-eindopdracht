import React from 'react';
import './Footer.css';
import {NavLink} from "react-router-dom";
import styles from "../header/Header.css";

function Footer({text}) {

    return (
        <footer className="pageOuterContainer">
            <div className="pageInnerContainer">
                <ul>
                    <li key='contact'>
                        <NavLink to='/contact' exact activeClassName='active-link'>{text}</NavLink>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;