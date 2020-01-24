import React from "react";
import styles from './ShopContent.module.css'
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";
import ProductCard from "../../ProductCard/ProductCard";

const ShopContent = (props) => {
    if (props.isFetching) {
        return <Spinner/>
    }
    if (props.failed) {
        return <Error message="something goes wrong"/>
    }

    return <div className={styles.shopHeader}>
        {props.products.map(p =>
            <ProductCard key={p.id} {...props} productCard={p}/>
        )}
    </div>
}

export default ShopContent