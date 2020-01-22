import React from "react";
import styles from './SelectionForm.module.css'
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

class SelectionForm extends React.Component {

    render() {
        return <form onSubmit={this.props.handleSubmit}>
            {this.props.selections.map((s) => {
                return <p key={s.selectorName}>
                    <span>{s.selectorName}</span>
                    <Field component={'select'} name={s.selectorName} placeholder={`Выберите ${s.selectorName}`}
                           validate={[required]}>
                        <option>Выберите</option>
                        {s.selectorList.map((i) => {
                            return <option key={i}>{i}</option>;
                        })}
                    </Field>
                </p>
            })}

            <p className={styles.productPrice}>
                <span className={styles.productPriceValue}>{this.props.variant.price}&nbsp;</span>
                    {this.props.variant.currency}
                <button className={styles.addCart}><FontAwesomeIcon
                    icon={faArrowRight} title="Добавить в корзину"
                    disabled={this.props.invalid || this.props.submitting || this.props.pristine}/>&nbsp;Добавить в корзину</button>
            </p>

        </form>;
    }
}

export default compose(
    reduxForm({form: 'selectionForm'})
)(SelectionForm)
