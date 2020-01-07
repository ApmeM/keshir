import React from "react";
import Error from "../Error/Error";
import styles from './ProductCard.module.css'
import {NavLink} from "react-router-dom";

class ProductCardContainer extends React.Component {
    render() {
        if(this.props.productCard === undefined){
            return <Error message="No product found."/>
        }

        return <div>
            <div className={styles.productName}>{this.props.productCard.name}</div>
            <div><NavLink to={`/product/${this.props.productCard.id}`}>{this.props.productCard.name}</NavLink></div>
            <div dangerouslySetInnerHTML={{__html: this.props.productCard.description}}></div>
            <div>
                <button>Read more</button>
            </div>
            <hr></hr>
        </div>;
    }
}
export default ProductCardContainer