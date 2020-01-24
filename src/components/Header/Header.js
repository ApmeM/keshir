import React from 'react';
import styles from './Header.module.css';
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
import Social from "../Social/Social";

const Header = (props) => {
    return <header className={styles.header}>
        <Logo/>
        <Social/>
        <Nav/>
    </header>
}

export default Header;