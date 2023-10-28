import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
// @ts-ignore
import styles from "./app.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/ingredients/actions";
import {Route, Routes, useLocation} from "react-router-dom";
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

const App = () => {
    const dispatch:any = useDispatch()
    let location = useLocation();
    let accessToken = getCookie('token')
    let state = location.state as { backgroundLocation?: Location };
    const {isModalOpen, openModal, closeModal} = useModal();

    // @ts-ignore
    const ingredient = useSelector(state => state.ingredients.ingredients)
    const [date, setDate] = useState({});
    useEffect(()=> {
        if (ingredient.length > 0) {
            // @ts-ignore
            setDate(ingredient.find(item => item._id === location.pathname.split('/')[2]))
        }
    }, [ingredient, location])

    useEffect(() => {
        dispatch(getIngredients())
        if (accessToken) {
            dispatch(getUser())
        }
    }, [dispatch]);

    useEffect(() => {
        openModal()
    }, [date]);




    return (
        <>
            <AppHeader/>
            <main className={styles.containerBurger}>
                <Routes location={state?.backgroundLocation || location}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/profile" element={<ProtectedRouteElement><ProfilePage/></ProtectedRouteElement>}/>
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
                                            <Modal title="Детали ингредиента" setActive={closeModal}>
                                                <IngredientDetails data={date}/>
                                            </Modal>
                                        )}

                                    </>

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
