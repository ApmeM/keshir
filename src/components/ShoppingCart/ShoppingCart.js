import React from "react";
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

class ShoppingCart extends React.Component {
    componentDidMount() {
        this.props.fetchShoppingCart();
    }

    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }

        if (this.props.failed) {
            return <Error message="Что-то пошло не так. Пожалуйста перезагрузите страницу и попробуйте ее раз."/>
        }

        if (this.props.products.length === 0) {
            if (this.props.showPopup){
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
                    <td></td>
                    <td className={styles.cartPrice}>Стоимость</td>
                </tr>
                </thead>
                <tbody>

                {this.props.products.map((p) => {
                    return <tr key={p.id}>
                        <td className={styles.table_td}>
                            <NavLink to={`/product/${p.id}`}>
                                <img className={styles.productThumbnail} src={p.images} alt='thumbnail'/>
                                <div className={styles.productName}>{p.type} {p.name} {p.variant} </div>
                                <div>{ Object.keys(p.selection).map((b) => {
                                    return <div key={b}>{b} {p.selection[b]}</div>;
                                }, "")}</div>
                            </NavLink>
                            <div className={styles.productPrice}>
                                <div>{p.price}&nbsp;</div>
                                {p.currency}</div>
                            <div dangerouslySetInnerHTML={{__html: p.description}}
                                 className={styles.productDescription}></div>
                        </td>
                        <td>
                            <button onClick={() => this.props.decreaseCount(p.id, p.id)} title="Убавить" className={styles.controlButton}>
                                <FontAwesomeIcon icon={faMinus}/></button>
                            {p.count}
                            <button onClick={() => this.props.increaseCount(p.id, p.id)} title="Добавить" className={styles.controlButton}>
                                <FontAwesomeIcon icon={faPlus}/></button>
                        </td>
                        <td>   <button onClick={() => this.props.removeProduct(p.id, p.id)} title="Удалить"
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
                        Общая сумма : <span>{this.props.productsTotal + 300}</span> руб.
                    </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="4" >
                        <PlaceOrderForm onSubmit={(form) => this.props.purchase(form.contact, this.props.products)}/>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    }
}

const mapStateToProps = state => {
  return {
      ...state.shoppingCart,
      productsTotal: state.shoppingCart.products.reduce((acc, value) => acc + value.count * value.price, 0)
  }
} ;
export default compose(
    connect(mapStateToProps, {
        increaseCount,
        decreaseCount,
        removeProduct,
        fetchShoppingCart,
        purchase
    })
)(ShoppingCart)
