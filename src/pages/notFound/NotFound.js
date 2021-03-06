//React imports
import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

//asset imports
import Website from '../../assets/images/Website.png';
import Button from '../../components/button/Button';
import ContentContainer from '../../components/contentContainer/ContentContainer';

function NotFound() {

    const history = useHistory();
    useEffect(() => {
        document.documentElement.style.setProperty('--dynamic-background-color', '#F4E15E');
    }, []);

    function backToHome() {
        history.push('./');
    }

    return (
        <>
            <main>
                <section className='pageOuterContainer'>
                    <div className='pageInnerContainer'>
                        <ContentContainer
                            secondtitle='404 - Page not found'
                        />
                        <img className='page-not-found' src={Website} alt='404 - not found'/>
                        <Button type='button' text='Back to homepage' onClick={backToHome}/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default NotFound;