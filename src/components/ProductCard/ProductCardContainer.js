import React from "react";
import Error from "../Error/Error";
import styles from './ProductCard.module.css'
import {NavLink} from "react-router-dom";

class ProductCardContainer extends React.Component {
    render() {
        if(this.props.productCard === undefined){
            return <div className={styles.table_td}><Error message="No product found."/></div>
        }

        return <div className={styles.table_td}>

            <NavLink to={`/product/${this.props.productCard.id}`}>
                <img className={styles.productThumbnail} src={this.props.productCard.thumbnail} alt='thumbnail'/>
                <div className={styles.productName}>{this.props.productCard.name}</div>
            </NavLink>
            <div dangerouslySetInnerHTML={{__html: this.props.productCard.description}}></div>
        </div>;
    }
}
export default ProductCardContainer