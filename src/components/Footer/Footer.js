import React from 'react';
import styles from './Footer.module.css';

class Footer extends React.Component {
    render() {
        return <div className={styles.footer}>© 2020 {process.env.REACT_APP_LOGO}</div>
    }
}

export default Footer;
