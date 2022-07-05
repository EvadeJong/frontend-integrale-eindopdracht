import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

function Footer({text}) {

    return (
        <footer className='pageOuterContainer'>
            <div className='pageInnerContainer'>
                <Link to='/contact' >{text}</Link>
            </div>
        </footer>
    );
}

export default Footer;