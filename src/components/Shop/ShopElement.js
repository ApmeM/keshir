import React from "react";
import styles from './Shop.module.css'
import {NavLink} from "react-router-dom";

class ShopElement extends React.Component {
    render() {
        return <div>
            <div className={styles.productName}>{this.props.product.name}</div>
            <div><NavLink to={`/product/${this.props.product.id}`}>{this.props.product.name}</NavLink></div>
            <div dangerouslySetInnerHTML={{__html: this.props.product.description}}></div>
            <div>
                <button>Read more</button>
            </div>
            <hr></hr>
        </div>;
    }
}
export default ShopElement