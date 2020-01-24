import React from 'react';
import styles from './Footer.module.css';
import Social from "../Social/Social";
import {NavLink} from "react-router-dom";

const Footer = (props) => {
    return <div className={styles.footer}>
        <Social/>
        <div className={styles.footerLogo}>© 2020 {process.env.REACT_APP_LOGO}</div>
        <NavLink activeClassName={styles.active} to="/about">Оплата&nbsp;и&nbsp;доставка</NavLink>
    </div>
}

export default Footer;
