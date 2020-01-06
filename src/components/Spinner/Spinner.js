import React from "react";
import styles from "./Spinner.module.css"
import spinner from "./spinner.gif"
export default (props) => <div className={styles.spinner}>
    <img src={spinner} alt='loading...'/>
</div>