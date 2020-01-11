import React from "react";
import {connect} from "react-redux";                          
import {fetchProduct} from "./ProductReducer";
import styles from './Product.module.css'
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {withRouter} from "react-router-dom";

class ProductContainer extends React.Component {
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

        return <div class={styles.productWrap}>
            <div class={styles.productImage}>
                <img src={this.props.product.thumbnail} alt='product'/>
            </div>
            <div class={styles.productDesc}>
                <div className={styles.productName}>{this.props.product.name}</div>
                <div className={styles.productPrice}>{this.props.product.price}</div>
                <div dangerouslySetInnerHTML={{__html: this.props.product.description}} className={styles.productDescription}></div>
                <div dangerouslySetInnerHTML={{__html: this.props.product.characteristics}} className={styles.productCharacteristics}></div>
            </div>
        </div>;
    }
}
const mapStateToProps = state => state.product
export default connect(mapStateToProps, {fetchProduct})(withRouter(ProductContainer))
