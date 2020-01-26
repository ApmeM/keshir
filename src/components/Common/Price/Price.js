import styles from "./Price.module.css";
import React from "react";

export const Price = (props) => {
    return <>
        {props.price !== props.originalPrice ?
            <>
                <span className={styles.productOriginalPriceValue}>{props.originalPrice}</span>&nbsp;
            </> :
            <>
            </>}
        <span className={styles.productPriceValue}>{props.price}&nbsp;</span>
        {props.currency}
    </>
};