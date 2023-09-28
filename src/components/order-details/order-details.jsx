import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";


const OrderDetails = () => {
    return (
        <section className={styles.containerOrderDetails}>
            <h1 className={`text text_type_digits-large pt-9 ${styles.containerTitleOrderDetails}`}>
                034536
            </h1>
            <span className={`text text_type_main-medium`}>
                идентификатор заказа
            </span>
            <div className={`pt-15 pb-15 ${styles.containerOrderDetailsImage}`}>
                {/*?*/}
                <CheckMarkIcon type="primary"/>
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

};

export default OrderDetails;