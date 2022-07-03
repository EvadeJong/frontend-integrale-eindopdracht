import React from 'react';
import './Footer.css';
import {NavLink} from "react-router-dom";

function Footer({text}) {

    return (
        <footer className='pageOuterContainer'>
            <div className='pageInnerContainer'>
                <NavLink to='/contact' exact activeClassName='active-link'>{text}</NavLink>
            </div>
        </footer>
    );
}

export default Footer;