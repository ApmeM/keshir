import React from "react";
import {connect} from "react-redux";
import styles from "./Nav.module.css";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class Nav extends React.Component {
    render() {
        // ToDo: move calculations to somewhere else
        let productsCount = this.props.products.reduce((acc, value) => acc + value.count, 0)

        return <div className={styles.wrapper}>
            <ul>
                <li>
                    <NavLink activeClassName={styles.active} to="/shop/Knitting">Пряжа</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to="/shop/Blockers">Блокаторы</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to="/about">Оплата и доставка</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} className={styles.navCart} to="/cart"><FontAwesomeIcon icon={faShoppingCart} />{productsCount === 0 ? "" : productsCount}</NavLink>
                </li>
            </ul>
        </div>
    }
}

const mapStateToProps = state => state.shoppingCart
export default connect(mapStateToProps)(Nav)
