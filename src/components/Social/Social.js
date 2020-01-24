import React from "react";
import styles from "./Social.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'

const Social = (props) => {
    return <div className={styles.social}>
        <a href="https://instagram.com/keshir.ka/" title="instagram"><FontAwesomeIcon icon={faInstagram}/></a>
    </div>
}

export default Social;