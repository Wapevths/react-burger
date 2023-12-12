import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css"
import {getIngredients} from "../../services/ingredients/actions";
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import {getCookie} from "../../utils/cookie";
import {getUser} from "../../services/users/actions";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import Modal from "../modal/modal";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useModal} from "../../hooks/useModal";
import {ITypesIngredient} from "../../utils/types-ingredient";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import FeedPage from "../../pages/feed-page/feed-page";
import DetailedOrderPage from "../../pages/detailed-order-page/detailed-order-page";
import {getDetailedOrder} from "../../services/detailed-order/actions";
import DetailedOrder from "../detailed-order/detailed-order";
import OrderPage from "../../pages/orders-page/orders-page";

const App = () => {
    const dispatch = useAppDispatch()
    let location = useLocation();
    let accessToken:string|undefined = getCookie('token')
    let state = location.state as { backgroundLocation?: Location };
    const {isModalOpen, openModal, closeModal} = useModal();
    const navigate = useNavigate()
    const ingredient:ITypesIngredient[] = useAppSelector((state) => state.ingredients.ingredients)
    const detailedOrder = useAppSelector(state => state.detailedOrder.order)
    const [date, setDate] = useState<ITypesIngredient|undefined>(undefined);



    useEffect(()=> {
        if (ingredient.length > 0) {
            setDate(ingredient.find(item => item._id === location.pathname.split('/')[2]))
        }
    }, [ingredient, location])

    useEffect(() => {
        if (location.pathname.split('/')[1] === "feed") {
            dispatch(getDetailedOrder(location.pathname.split('/')[2]))
        } else if (location.pathname.split('/')[2] === "orders") {
            dispatch(getDetailedOrder(location.pathname.split('/')[3]))
        }
    }, [dispatch, location.pathname.split('/')[2], location.pathname.split('/')[3]]);

    useEffect(() => {
        dispatch(getIngredients())
        if (accessToken) {
            dispatch(getUser())
        }
    }, [dispatch]);

    useEffect(() => {
        openModal()
    }, [date]);

    const handleCloseModal = () => {
        if (location.pathname.split('/')[1] === "feed") {
            navigate('/feed')
            closeModal()
        } else if (location.pathname.split('/')[2] === "orders") {
            navigate('/profile/orders')
            closeModal()
        }
        else {
            navigate('/')
            closeModal()
        }
    }

    useEffect(() => {
        if (location.pathname.split('/')[1] === "feed") {
            openModal()
        } else if (location.pathname.split('/')[2] === "orders") {
            openModal()
        }
    }, [location]);



    return (
        <>
            <AppHeader/>
            <main className={styles.containerBurger}>
                <Routes location={state?.backgroundLocation || location}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/feed/:id" element={<DetailedOrderPage />} />
                    <Route path='/profile' element={
                        <ProtectedRouteElement>
                            <ProfilePage/>
                        </ProtectedRouteElement>
                    }/>
                    <Route path="profile/orders" element={<ProtectedRouteElement>
                        <OrderPage/>
                    </ProtectedRouteElement>} />
                    <Route path="profile/orders/:id" element={<ProtectedRouteElement>
                        <DetailedOrderPage/>
                    </ProtectedRouteElement>} />
                    <Route path="/login" element={<ProtectedRouteElement onlyUnAuth><LoginPage /></ProtectedRouteElement>} />
                    <Route path="/register" element={<ProtectedRouteElement onlyUnAuth><RegisterPage /></ProtectedRouteElement>} />
                    <Route path="/forgot-password" element={<ProtectedRouteElement onlyUnAuth><ForgotPasswordPage /></ProtectedRouteElement>} />
                    <Route path="/reset-password" element={<ProtectedRouteElement onlyUnAuth><ResetPasswordPage /></ProtectedRouteElement>} />
                    <Route path={`ingredients/:id`} element={<IngredientPage/>} />
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
                {state?.backgroundLocation && (
                    <Routes>
                        <Route path="ingredients/:id" element={
                            <>
                                {date != undefined && (
                                    <>
                                        {isModalOpen && (
                                            <Modal title="Детали ингредиента" setActive={handleCloseModal}>
                                                <IngredientDetails data={date}/>
                                            </Modal>
                                        )}

                                    </>

                                )}

                            </>

                        } />
                        <Route path="feed/:id" element={
                            <>
                                        {isModalOpen && (
                                            <Modal title="" setActive={handleCloseModal}>
                                                <DetailedOrder numberOrder={detailedOrder[0]?.number}
                                                               statusOrder={detailedOrder[0]?.status}
                                                               name={detailedOrder[0]?.name}
                                                               numberPositionCenter={false}
                                                               ingredients={detailedOrder[0]?.ingredients}
                                                               date={detailedOrder[0]?.createdAt}
                                                />
                                            </Modal>
                                        )}
                            </>

                        } />
                        <Route path="profile/orders/:id" element={
                            <>
                                        {isModalOpen && (
                                            <Modal title="" setActive={handleCloseModal}>
                                                <DetailedOrder numberOrder={detailedOrder[0]?.number}
                                                               statusOrder={detailedOrder[0]?.status}
                                                               name={detailedOrder[0]?.name}
                                                               numberPositionCenter={false}
                                                               ingredients={detailedOrder[0]?.ingredients}
                                                               date={detailedOrder[0]?.createdAt}
                                                />
                                            </Modal>
                                        )}
                            </>

                        } />
                    </Routes>
                )}
            </main>
        </>
    );
}

export default App;
