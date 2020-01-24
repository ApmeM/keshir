import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchProducts, fetchTypes} from "./ShopReducer";
import styles from './Shop.module.css'
import ShopHeader from "./ShopHeader/ShopHeader";
import ShopContent from "./ShopContent/ShopContent";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const Shop = (props) => {
    const {categoryName, currentType} = props.match.params;
    const fetchTypes = props.fetchTypes;

    useEffect(() => {
        fetchTypes(categoryName, currentType);
    }, [fetchTypes, categoryName, currentType]);

    if (props.isFetching) {
        return <Spinner/>
    }
    if (props.failed) {
        return <Error message="something goes wrong"/>
    }

    return <div className={styles.shop}>
        <ShopHeader {...props.types}
                    fetchProducts={(type) => props.fetchProducts(props.match.params.categoryName, type)}/>
        <ShopContent {...props.products}/>
    </div>
};

const mapStateToProps = state => state.shop;
export default compose(
    connect(mapStateToProps, {fetchTypes, fetchProducts}),
    withRouter
)(Shop)