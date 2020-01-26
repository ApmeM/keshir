import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    decreaseCount,
    fetchShoppingCart,
    increaseCount,
    purchase,
    removeProduct,
} from "./ShoppingCartReducer";
import styles from './ShoppingCart.module.css'
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMinus, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {compose} from "redux";
import PlaceOrderForm from "./PlaceOrderForm/PlaceOrderForm";
import {Price} from "../Common/Price/Price";

export const PureShoppingCart = (props) => {

    const fetchShoppingCart = props.fetchShoppingCart;
    useEffect(()=>{
        fetchShoppingCart();
    }, [fetchShoppingCart])

    if (props.isFetching) {
        return <Spinner/>
    }

    if (props.failed) {
        return <Error message="Что-то пошло не так. Пожалуйста перезагрузите страницу и попробуйте ее раз."/>
    }

    if (props.products.length === 0) {
        if (props.showPopup) {
            return <div>Спасибо, что разместили заказ<br/>Мы скоро свяжемся с вами.<br/>
                <NavLink to={'/'}>Вернуться к магазину.</NavLink>
            </div>
        }
        return <Error message="Ваша корзина пуста."/>
    }


    return <div className={styles.news}>
        <table className={styles.cartTable}>
            <thead>
            <tr>
                <td>Продукт</td>
                <td>Количество</td>
                <td className={styles.cartDeleteHolder}></td>
                <td className={styles.cartPrice}>Стоимость</td>
            </tr>
            </thead>
            <tbody>

            {props.products.map((p) => {
                return <tr key={p.id}>
                    <td className={styles.table_td}>
                        <NavLink to={`/product/${p.productId}`}>
                            <img className={styles.productThumbnail} src={p.images} alt='thumbnail'/>
                            <div className={styles.productName}>{p.type} {p.name} {p.variant} </div>
                        </NavLink>
                        <div>{Object.keys(p.selection).map((b) => {
                            return <div key={b}>{b} {p.selection[b]}</div>;
                        }, "")}</div>

                        <Price price={p.price} originalPrice={p.originalPrice} currency={p.currency}/>
                        <div dangerouslySetInnerHTML={{__html: p.description}}
                             className={styles.productDescription}></div>
                    </td>
                    <td>
                        <button onClick={() => props.decreaseCount(p.id)} title="Убавить"
                                className={styles.controlButton} disabled={1 === p.count}>
                            <FontAwesomeIcon icon={faMinus}/></button>
                        {p.count}
                        <button onClick={() => props.increaseCount(p.id)} title="Добавить"
                                className={styles.controlButton} disabled={p.available === p.count}>
                            <FontAwesomeIcon icon={faPlus}/></button>
                    </td>
                    <td className={styles.cartDeleteHolder}>
                        <button onClick={() => props.removeProduct(p.id)} title="Удалить"
                                className={`${styles.cartDelete} ${styles.controlButton}`}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </td>
                    <td className={styles.cartPrice}>
                        <span>{p.count * p.price}</span> {p.currency}
                    </td>
                </tr>
            })}
            <tr>
                <td colSpan="4" className={styles.cartPriceTotal}>
                    Доставка почтой : <span>300</span> руб.
                </td>
            </tr>
            <tr>
                <td colSpan="4" className={styles.cartPriceTotal}>
                    Общая сумма : <span>{props.productsTotal + 300}</span> руб.
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td colSpan="4">
                    <PlaceOrderForm onSubmit={(form) => props.purchase(form.contact, props.products, props.productsTotal + 300)}/>
                </td>
            </tr>
            </tfoot>
        </table>
    </div>
}

const mapStateToProps = state => {
    return {
        ...state.shoppingCart,
        productsTotal: state.shoppingCart.products.reduce((acc, value) => acc + value.count * value.price, 0)
    }
};

export default compose(
    connect(mapStateToProps, {
        increaseCount,
        decreaseCount,
        removeProduct,
        fetchShoppingCart,
        purchase
    })
)(PureShoppingCart)
