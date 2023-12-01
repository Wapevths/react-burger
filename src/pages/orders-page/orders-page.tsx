import {useEffect} from 'react';
import styles from './orders-page.module.css'
import {postLogoutUser} from "../../services/users/actions";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import OrderFeedList from "../../components/order-feed-list/order-feed-list";
import {orderLineConnect} from "../../services/web-socket/actions";



const OrderPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(postLogoutUser(navigate))
    }

    useEffect(() => {
        dispatch(orderLineConnect('wss://norma.nomoreparties.space/orders'))
    }, [dispatch])

    const myDataFeed = useAppSelector(state => state.orderLineDate.orderLineData)

    return (
        <div className={styles.containerOrderPage}>
            <div className={styles.containerLeftMenuOrder}>
                <div className={styles.containerLink}>
                    <NavLink to='/profile' className={styles.link}>
                            <span className={`text text_type_main-medium`}>
                                Профиль
                            </span>
                    </NavLink>
                    <NavLink to='' className={styles.link}>
                            <span className={`${ styles.selectLink} text text_type_main-medium`}>
                                История заказов
                            </span>
                    </NavLink>
                    <button className={`${styles.exitButton} text text_type_main-medium`}
                            onClick={handleLogout}
                    >
                        Выход
                    </button>
                </div>

                <div className={styles.containerInfoThisPage}>
                    <span className={`${styles.infoThisPage} text text_type_main-default mt-14 pt-14`}>
                        В этом разделе вы можете
                    </span>
                    <span className={`${styles.infoThisPage} text text_type_main-default`}>
                        изменить свои персональные данные
                    </span>
                </div>
            </div>
            <OrderFeedList widthContainer={844} myDataFeed={myDataFeed} isVisibleStatusOrder={true}/>
        </div>
    );
};

export default OrderPage;
