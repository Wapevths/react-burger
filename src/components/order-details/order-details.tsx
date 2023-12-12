import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css'
import CheckImage from '../../images/graphics.svg'

interface IOrderDetails {
    orderConstructor: {
        name: string,
        order: {
            number: number
        },
        success: boolean
    }
}

const OrderDetails = (props:IOrderDetails) => {
    return (
        <section className={styles.containerOrderDetails}>
            <h1 className={`text text_type_digits-large pt-9 ${styles.containerTitleOrderDetails}`} id="order-number">
                {props.orderConstructor.order.number}
            </h1>
            <span className={`text text_type_main-medium`}>
                идентификатор заказа
            </span>
            <div className={`pt-15 pb-15 ${styles.containerOrderDetailsImage}`}>
                <img className={styles.checkImage} src={CheckImage} alt="check"/>
            </div>

            <span className={`text text_type_main-default pb-2`}>
                Ваш заказ начали готовить
            </span>

            <span className={`text text_type_main-default pb-15 ${styles.orderDetailsWaitReady}`}>
                Дождитесь готовности на орбитальной станции
            </span>
        </section>
    );
};

OrderDetails.propTypes = {
    orderConstructor: PropTypes.object.isRequired
};

export default OrderDetails;
