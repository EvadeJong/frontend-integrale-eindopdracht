//React imports
import React from 'react';
import {Link} from 'react-router-dom';

//CSS imports
import './Footer.css';

function Footer({text}) {

    return (
        <footer className='pageOuterContainer'>
            <div className='pageInnerContainer'>
                <Link to='/contact'>{text}</Link>
            </div>
        </footer>
    );
}

export default Footer;