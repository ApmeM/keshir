import React from "react";
import {connect} from "react-redux";
import {fetchProduct, switchVariant} from "./ProductReducer";
import {addProduct} from "../ShoppingCart/ShoppingCartReducer";
import styles from './Product.module.css'
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {compose} from "redux";

class Product extends React.Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.productId);
    }

    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }
        if (this.props.failed) {
            return <Error message="something goes wrong"/>
        }

        if (this.props.product === undefined) {
            return <Error message="No product found."/>
        }

        let variants = this.props.product.variants.filter((v) => v.id === this.props.variantId);
        let variant = this.props.product.variants[0];
        if (variants.length !== 0) {
            variant = variants[0];
        }

        return <div className={styles.productWrap}>
            <div className={styles.productImage}>
                <img src={variant.thumbnail} alt='product'/>
            </div>
            <div className={styles.productDesc}>
                <div className={styles.productName}>{variant.name} <br/>{variant.variant}</div>
                <div className={styles.productPrice}>

                    <button onClick={() => this.props.addProduct(variant)} className={styles.addCart}><FontAwesomeIcon
                        icon={faCartPlus} title="Добавить в корзину" /></button>
                    <div>{variant.price} </div>
                    {variant.currency}</div>

                <div dangerouslySetInnerHTML={{__html: variant.description}} className={styles.productDescription}/>
                <div dangerouslySetInnerHTML={{__html: variant.characteristics}}
                     className={styles.productCharacteristics}/>
            </div>
            <div className={styles.variants}>
                Варианты:
                {this.props.product.variants.map((v) =>
                    <button key={v.id} className={styles.variant} onClick={() => this.props.switchVariant(v.id)}><img
                        src={v.thumbnail} alt="variant" title={v.variant}/></button>
                )}
            </div>
        </div>;
    }
}

const mapStateToProps = state => state.product;
export default compose(
    connect(mapStateToProps, {fetchProduct, addProduct, switchVariant}),
    withRouter
)(Product)
