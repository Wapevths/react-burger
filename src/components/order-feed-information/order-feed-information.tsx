//@ts-nocheck
import React, {useEffect} from 'react';
import styles from './order-feed-information.module.css'
import {useAppSelector} from "../../hooks/redux-hooks";
const OrderFeedInformation = () => {
    const myData = useAppSelector(state => state.orderLineDate.orderLineData)

    return (
        <div className={styles.containerOrderFeedInformation}>
            <section className={styles.containerCompleteWork}>
                <div className={`${styles.subContainerCompleteWork}`}>
                    <h3 className={`text text_type_main-medium pb-5`}>
                        Готовы:
                    </h3>
                    <div className={styles.subContainerNumberOrder}>
                        {myData.orders.map((item, index) => (
                            <section key={index}>
                                {index <= 11 ? (
                                    <div className={`text text_type_digits-default ${styles.completeTextOrder}`}>
                                        {item.status === "done" ? item.number : ""}
                                    </div>
                                ) :
                                <>

                                </>}

                            </section>
                        ))}

                    </div>
                </div>
                <div className={`${styles.subContainerCompleteWork}`}>
                    <h3 className={`text text_type_main-medium pb-6`}>
                        В работе:
                    </h3>
                    <div className={styles.subContainerNumberOrder}>
                        {myData.orders.map((item, index) => (
                            <section key={index}>
                                {index <= 11 ? (
                                        <div className={`text text_type_digits-default `}>
                                            {item.status === "pending" ? item.number : ""}
                                        </div>
                                    ) :
                                    <>
                                    </>}

                            </section>
                        ))}
                    </div>
                </div>
            </section>
            <section>
                <h3 className={`text text_type_main-medium`}>
                    Выполнено за все время:
                </h3>
                <h1 className={`${styles.completeTextOrderAllTime} text text_type_digits-large`}>
                    {myData.total}
                </h1>
            </section>
            <section>
                <h3 className={`text text_type_main-medium`}>
                    Выполнено за сегодня:
                </h3>
                <h1 className={`${styles.completeTextOrderAllTime} text text_type_digits-large`}>
                    {myData.totalToday}
                </h1>
            </section>
        </div>
    );
};

export default OrderFeedInformation;
