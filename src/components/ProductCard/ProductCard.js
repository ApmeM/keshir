import React from "react";
import Error from "../Error/Error";
import styles from './ProductCard.module.css'
import {NavLink} from "react-router-dom";
import {Price} from "../Common/Price/Price";

const ProductCard = (props) => {
    if (props.productCard === undefined) {
        return <div className={styles.table_td}><Error message="No product found."/></div>
    }

    return <div className={styles.table_td}>
        <NavLink to={`/product/${props.productCard.id}`}>
            <img className={styles.productThumbnail} src={props.productCard.thumbnail} alt='thumbnail'/>
            <div className={styles.productName}>{props.productCard.type} {props.productCard.name}</div>
        </NavLink>
        <div className={styles.productPrice}>
            <Price price={props.productCard.price} originalPrice={props.productCard.originalPrice} currency={props.productCard.currency}/>
        </div>
        <div dangerouslySetInnerHTML={{__html: props.productCard.description}}
             className={styles.productDescription}></div>
    </div>;

}

export default ProductCard