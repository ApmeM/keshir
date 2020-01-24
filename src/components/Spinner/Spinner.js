import React from "react";
import styles from "./Spinner.module.css"
import spinner from "./spinner.gif"

const Spinner = (props) => {
    return <div className={styles.spinner}>
        <img src={spinner} alt='loading...'/>
    </div>
}

export default Spinner