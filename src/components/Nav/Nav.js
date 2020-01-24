import React, {useEffect} from "react";
import {connect} from "react-redux";
import styles from "./Nav.module.css";
import {NavLink} from "react-router-dom";
import {fetchShoppingCart} from "../ShoppingCart/ShoppingCartReducer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {compose} from "redux";

const Nav = (props) => {
    const fetchShoppingCart = props.fetchShoppingCart;
    useEffect(() => {
        fetchShoppingCart();
    }, [fetchShoppingCart]);

    return <div className={styles.wrapper}>
        <ul>
            <li>
                <NavLink activeClassName={styles.active} to="/shop/Knitting">Пряжа</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.active} to="/shop/Blockers">Блокаторы</NavLink>
            </li>
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
        ...state.shoppingCart,
        productsCount: state.shoppingCart.products.reduce((acc, value) => acc + value.count, 0)
    };
}
export default compose(
    connect(mapStateToProps, {fetchShoppingCart})
)(Nav)
