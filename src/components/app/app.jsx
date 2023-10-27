import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/ingredients/actions";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
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

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let location = useLocation();
    // let state = location?.state as  location?.state.backgroundLocation;
    let state = location.state ;
    let accessToken = getCookie('token')
    useEffect(() => {
        dispatch(getIngredients())
        if (accessToken) {
            dispatch(getUser(navigate))
        }
    }, [dispatch]);



    return (
        <>
            <AppHeader/>
            <main className={styles.containerBurger}>
                <Routes location={state?.backgroundLocation || location}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/profile" element={<ProtectedRouteElement><ProfilePage/></ProtectedRouteElement>}/>
                    <Route path="/login" element={<ProtectedRouteElement onlyUnAuth><LoginPage /></ProtectedRouteElement>} />
                    <Route path="/register" element={<ProtectedRouteElement onlyUnAuth> <RegisterPage /></ProtectedRouteElement>} />
                    <Route path="/forgot-password" element={<ProtectedRouteElement onlyUnAuth><ForgotPasswordPage /></ProtectedRouteElement>} />
                    <Route path="/reset-password" element={<ProtectedRouteElement onlyUnAuth><ResetPasswordPage /></ProtectedRouteElement>} />
                    <Route path={`ingredients/:id`} element={<IngredientPage/>} />
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>

            </main>
        </>
    );
}

export default App;
