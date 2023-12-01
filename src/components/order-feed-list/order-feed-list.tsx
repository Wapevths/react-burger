import styles from './order-feed-list.module.css'
import OrderCard from "../order-card/order-card";

interface IOrderFeedListProps {
    widthContainer: number,
    myDataFeed: {
        orders: {
            name: string,
            status: string,
            ingredients: {}[],
            createdAt: string,
            number: number
        }[]
    },
    isVisibleStatusOrder?: boolean
}

const OrderFeedList = ({widthContainer, myDataFeed, isVisibleStatusOrder}:IOrderFeedListProps) => {
    return (
        <div className={styles.containerOrderFeed} style={{maxWidth: `${widthContainer}px`}}>
            <section className={`custom-scroll ${styles.subContainerOrderFeed}`}>
                {myDataFeed.orders !== undefined && myDataFeed.orders?.map((item, index) => (
                <OrderCard key={index}
                           isVisibleStatusOrder={isVisibleStatusOrder}
                           name={item.name}
                           status={item.status}
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
