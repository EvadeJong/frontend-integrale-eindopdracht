import React from 'react';
import styles from './Footer.module.css';

function Footer() {

    return (
        <footer className={styles.footerOuterContainer}>
            <div className={styles.footerInnerContainer}>
                Neem contact op!
            </div>
        </footer>
    );
}

export default Footer;