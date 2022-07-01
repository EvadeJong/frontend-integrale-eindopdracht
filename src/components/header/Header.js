import React, {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {ReactComponent as Lips} from "../../assets/Lippen.svg";
import {ReactComponent as Giggles} from "../../assets/Giggles.svg";
import {AuthContext} from "../../context/AuthContext";
import './Header.css'
import Navbar from "../navbar/Navbar";


function Header() {
    const {isAuth, logout} = useContext(AuthContext);
    return (
        <header className="pageOuterContainer">
            <div className="pageInnerContainer">
                <div className='header-images'>
                    <div className='lips'>
                    <Link to={'./'}>
                        <Lips />
                    </Link>
                    </div>
                    <div className='giggles'>
                        <Link to={'./'}>
                    <Giggles />
                        </Link>
                    </div>
                </div>
                <Navbar />
            </div>
        </header>

    );
}

export default Header;