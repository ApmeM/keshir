import React from "react";
import styles from './ShopHeader.module.css'
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";

const ShopHeader = (props) => {
    if (props.isFetching) {
        return <Spinner/>
    }
    if (props.failed) {
        return <Error message="something goes wrong"/>
    }

    return <div className={styles.shopHeader}>
        <ul className={styles.shopTypeList}>
            {props.types.map(t => {
                    return <li key={t}>
                        <button
                            onClick={() => props.fetchProducts(t)}
                            className={(props.currentType === t ? styles.active : '')}
                        >{t}</button>
                    </li>
                }
            )}
        </ul>
    </div>
}

export default ShopHeader