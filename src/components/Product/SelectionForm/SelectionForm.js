import React from "react";
import styles from './SelectionForm.module.css'
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {required} from "../../../utils/validators";

const SelectionForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {props.selections.map((s) => {
            return <p key={s.selectorName}>
                <span className={styles.selectorName}>{s.selectorName}</span>
                <Field component={'select'} name={s.selectorName} placeholder={`Выберите ${s.selectorName}`}
                       validate={[required]}>
                    <option value={''}>Выберите</option>
                    {s.selectorList.map((i) => {
                        return <option value={i} key={i}>{i}</option>;
                    })}
                </Field>
            </p>
        })}

        <p className={styles.productPrice}>
            <span className={styles.productPriceValue}>{props.variant.price}&nbsp;</span>
            {props.variant.currency}
            <button className={styles.addCart} disabled={props.invalid || props.submitting}><FontAwesomeIcon
                icon={faArrowRight} title="Добавить в корзину"
            />&nbsp;Добавить в корзину
            </button>
        </p>

    </form>;
}

export default compose(
    reduxForm({form: 'selectionForm'})
)(SelectionForm)
