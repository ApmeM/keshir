import React from "react";
import styles from "./Logo.module.css";
import {NavLink} from "react-router-dom";

class Logo extends React.Component {
    render() {
        return <div className={styles.logo}>
            <NavLink activeClassName={styles.active} to="/">{process.env.REACT_APP_LOGO}</NavLink>
        </div>
    }
}

export default Logo;