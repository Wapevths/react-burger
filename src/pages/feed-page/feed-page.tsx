import {useEffect} from 'react';
import OrderFeedList from "../../components/order-feed-list/order-feed-list";
import OrderFeedInformation from "../../components/order-feed-information/order-feed-information";
import styles from './feed-page.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {orderLineConnect} from "../../services/web-socket/actions";

const FeedPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(orderLineConnect('wss://norma.nomoreparties.space/orders/all'))
    }, [dispatch])
    const myDataFeed = useAppSelector(state => state.orderLineDate.orderLineData)

    return (
        <div className={styles.containerFeedPage}>
            <h2 className="text text_type_main-large pt-10 pb-5">
                Лента заказов
            </h2>
            <section className={styles.subContainerFeedPage}>
                <OrderFeedList widthContainer={640} myDataFeed={myDataFeed}/>
                <OrderFeedInformation/>
            </section>
        </div>
    );
};

export default FeedPage;
