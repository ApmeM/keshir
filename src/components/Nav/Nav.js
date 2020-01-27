import React, {useEffect} from "react";
import {connect} from "react-redux";
import styles from "./Nav.module.css";
import {NavLink} from "react-router-dom";
import {fetchShoppingCart} from "../ShoppingCart/ShoppingCartReducer";
import {fetchCategories} from "./NavReducer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {compose} from "redux";
import Spinner from "../Spinner/Spinner";

const Nav = (props) => {
    const fetchShoppingCart = props.fetchShoppingCart;
    useEffect(() => {
        fetchShoppingCart();
    }, [fetchShoppingCart]);

    const fetchCategories = props.fetchCategories;
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (props.isFetching){
        return <Spinner/>;
    }

    return <div className={styles.wrapper}>
        <ul>
            {
                props.categories.filter(c=>c.isHeader).map((t)=>{
                    return <li key={t.name}>
                        <NavLink activeClassName={styles.active} to={`/shop/${t.name}`}>{t.name}</NavLink>
                    </li>
                })
            }
            <li className={styles.liNavAbout}>
                <NavLink activeClassName={styles.active} to="/about">Оплата и доставка</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.active} className={styles.navCart} to="/cart"><FontAwesomeIcon
                    icon={faShoppingCart}/> {props.productsCount === 0 ? "" : props.productsCount}</NavLink>
            </li>
        </ul>
    </div>
}

const mapStateToProps = state => {
    return {
        ...state.nav,
        productsCount: state.shoppingCart.products.reduce((acc, value) => acc + value.count, 0)
    };
}
export default compose(
    connect(mapStateToProps, {fetchShoppingCart, fetchCategories})
)(Nav)
