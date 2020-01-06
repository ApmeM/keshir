import React from "react";
import styles from "./Nav.module.css";
import {NavLink} from "react-router-dom";
const Nav = props => {
    return <div className={styles.wrapper}>
        <ul>
            <li><NavLink exact activeClassName={styles.active} to="/">Products</NavLink></li>
            <li><NavLink activeClassName={styles.active} to="/about">About</NavLink></li>

        </ul>
    </div>
}

export default Nav;