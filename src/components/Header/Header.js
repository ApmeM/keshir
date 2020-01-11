import React from 'react';
import styles from './Header.module.css';
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
import Social from "../Social/Social";

class Header extends React.Component {
    render() {
        return <header className={styles.header}>
            <Logo/>
            <Nav/>
            <Social/>
        </header>
    }
}

export default Header;