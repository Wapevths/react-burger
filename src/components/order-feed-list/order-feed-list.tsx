//@ts-nocheck
import React from 'react';
import styles from './order-feed-list.module.css'
import OrderCard from "../order-card/order-card";
import {useAppSelector} from "../../hooks/redux-hooks";

interface IOrderFeedListProps {
    widthContainer: number,
}

const OrderFeedList = ({widthContainer}:IOrderFeedListProps) => {
    const myDataFeed = useAppSelector(state => state.orderLineDate.orderLineData)

    return (
        <div className={styles.containerOrderFeed} style={{maxWidth: `${widthContainer}px`}}>
            <section className={`custom-scroll ${styles.subContainerOrderFeed}`}>
                {myDataFeed?.orders?.map((item, index) => (
                <OrderCard key={index}
                           name={item.name}
                           ingredient={item.ingredients}
                           date={item.createdAt}
                           numberOrder={item.number}
                />)
                )
                }
            </section>
        </div>
    );
};

export default OrderFeedList;
