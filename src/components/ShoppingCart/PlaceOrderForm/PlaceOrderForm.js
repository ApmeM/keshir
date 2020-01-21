import React from "react";
import styles from './PlaceOrderForm.module.css'
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

class PlaceOrderForm extends React.Component {

    render() {
        return <form onSubmit={this.props.handleSubmit}>
            <div><p><span>Контактная информация: </span>
                <Field component={'input'} name={'contact'} placeholder={'email или номер телефон'} validate={[required]}/>
                <br/><i>Поле Контактная информация обязательно для заполнения</i></p>
            </div>
            <div>
                <button className={styles.buttonPurchase} disabled={this.props.invalid || this.props.submitting || this.props.pristine}>Оформить</button>
            </div>
        </form>;
    }
}

export default compose(
    reduxForm({form: 'placeOrder'})
)(PlaceOrderForm)
