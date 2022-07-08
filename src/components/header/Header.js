//React imports
import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Lips} from '../../assets/images/Lippen.svg';
import {ReactComponent as Giggles} from '../../assets/images/Giggles.svg';

//CSS imports
import './Header.css'

//Component imports
import Navbar from '../navbar/Navbar';

function Header() {
    return (
        <header className='pageOuterContainer'>
            <div className='pageInnerContainer'>
                <div className='header-images'>
                    <div className='lips'>
                        <Link to={'./'}>
                            <Lips/>
                        </Link>
                    </div>
                    <div className='giggles'>
                        <Link to={'./'}>
                            <Giggles/>
                        </Link>
                    </div>
                </div>
                <Navbar/>
            </div>
        </header>

    );
}

export default Header;