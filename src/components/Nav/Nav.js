import React from "react";
import styles from "./Nav.module.css";
import {NavLink} from "react-router-dom";

class Nav extends React.Component {
    render() {
        return <div className={styles.wrapper}>
            <ul>
                <li>
                    <NavLink activeClassName={styles.active} to="/shop/Knitting">Пряжа</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to="/shop/Blockers">Блокаторы</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to="/about">Обо мне</NavLink>
                </li>
            </ul>
        </div>
    }
}

export default Nav;