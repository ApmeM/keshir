import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchProduct, switchVariant} from "./ProductReducer";
import {addProduct} from "../ShoppingCart/ShoppingCartReducer";
import styles from './Product.module.css'
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import SelectionForm from "./SelectionForm/SelectionForm";

export const PureProduct = (props) => {
    const fetchProduct = props.fetchProduct;
    const productId = props.match.params.productId;

    useEffect(() => {
        fetchProduct(productId);
    }, [fetchProduct, productId]);

    if (props.isFetching) {
        return <Spinner/>
    }
    if (props.failed) {
        return <Error message="something goes wrong"/>
    }

    if (props.product === undefined) {
        return <Error message="No product found."/>
    }

    let variants = props.product.variants.filter((v) => v.id === props.variantId);
    let variant = props.product.variants[0];
    if (variants.length !== 0) {
        variant = variants[0];
    }
    return <div className={styles.productWrap}>
        <div className={styles.productImage}>
            <img src={variant.images} alt='product'/>
        </div>
        <div className={styles.productDesc}>
            <div className={styles.productName}>{variant.type} {variant.name} <br/>{variant.variant}</div>

            <div className={styles.variants}>
                Варианты:
                {props.product.variants.map((v) =>
                    <button key={v.id} className={`${styles.variant} ${v.id === variant.id ? styles.active : ''}`}
                            onClick={() => props.switchVariant(v.id)}><img
                        src={v.images} alt="variant" title={v.variant}/></button>
                )}
            </div>
            <div>
                {
                    (variant.available === undefined || variant.available > 0) ?
                        <SelectionForm selections={variant.selection} variant={variant}
                                       onSubmit={(form) => props.addProduct(variant, form)}/>
                        :
                        <div>Нет в наличии</div>
                }
            </div>

            <p><i dangerouslySetInnerHTML={{__html: variant.description}} className={styles.productDescription}/></p>
            <div dangerouslySetInnerHTML={{__html: variant.characteristics}}
                 className={styles.productCharacteristics}/>
        </div>
    </div>;
};

const mapStateToProps = state => state.product;
export default compose(
    connect(mapStateToProps, {fetchProduct, addProduct, switchVariant}),
    withRouter
)(PureProduct)
