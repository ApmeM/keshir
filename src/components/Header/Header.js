import React from 'react';
import styles from './Header.module.css';
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";

const Header = props => {
    return <header className={styles.header}>
        <Logo/>
        <Nav/>
    </header>
};

export default Header;