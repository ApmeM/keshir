import React from "react";
import {connect} from "react-redux";                          
import {fetchProduct} from "./ProductReducer";
import {addProduct} from "../ShoppingCart/ShoppingCartReducer";
import styles from './Product.module.css'
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {withRouter} from "react-router-dom";

class Product extends React.Component {
    componentDidMount() {
      this.props.fetchProduct(this.props.match.params.productId);
    }

    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }
        if (this.props.failed){
            return <Error message="something goes wrong"/>
        }

        if(this.props.product === undefined){
            return <Error message="No product found."/>
        }

        return <div className={styles.productWrap}>
            <div className={styles.productImage}>
                <img src={this.props.product.thumbnail} alt='product'/>
            </div>
            <div className={styles.productDesc}>
                <div className={styles.productName}>{this.props.product.name}</div>
                <div className={styles.productPrice}><div>{this.props.product.price}</div> {this.props.product.currency}</div>
                <div dangerouslySetInnerHTML={{__html: this.props.product.description}} className={styles.productDescription}></div>
                <div dangerouslySetInnerHTML={{__html: this.props.product.characteristics}} className={styles.productCharacteristics}></div>
            </div>
            <div>
                <button onClick={()=> this.props.addProduct(this.props.product)}>Add to cart.</button>
            </div>
        </div>;
    }
}
const mapStateToProps = state => state.product
export default connect(mapStateToProps, {fetchProduct, addProduct})(withRouter(Product))
