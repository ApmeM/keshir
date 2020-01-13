import React from "react";
import {connect} from "react-redux";                          
import {increaseCount, decreaseCount, removeProduct} from "./ShoppingCartReducer";
import styles from './ShoppingCart.module.css'
import ProductCard from "../ProductCard/ProductCard";
import Error from "../Error/Error";

class ShoppingCart extends React.Component {
    render() {
        if(this.props.products.length === 0){
            return <Error message="You have nothing in your cart."/>
        }

        // ToDo: move calculations to somewhere else
        let productsTotal = this.props.products.reduce((acc, value) => acc + value.count * value.price, 0)

        return <div className={styles.news}>
            {this.props.products.map((p)=> <div key={p.id}>
                <ProductCard {...this.props} productCard={ p } />
                <div>Count = {p.count}</div>
                <div>Sub Total = {p.count * p.price} {p.currency}</div>
                <button onClick={()=>this.props.increaseCount(p.id)}>+</button>
                <button onClick={()=>this.props.decreaseCount(p.id)}>-</button>
                <button onClick={()=>this.props.removeProduct(p.id)}>x</button>
            </div>)}
            <div>
                Total = {productsTotal}
            </div>
        </div>
    }
}
const mapStateToProps = state => state.shoppingCart
export default connect(mapStateToProps, {increaseCount, decreaseCount, removeProduct})(ShoppingCart)
