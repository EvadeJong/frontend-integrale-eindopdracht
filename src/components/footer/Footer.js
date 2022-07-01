import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

function Footer({text}) {

    return (
        <footer className="pageOuterContainer">
            <div className="pageInnerContainer">
                <ul>
                    <li>
                        <Link to='/contact' exact activeClassName='active-link'>{text}</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;