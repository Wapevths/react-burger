import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/ingredients/actions";
import {Route, Routes, useLocation} from "react-router-dom";
import MainPage from "../../pages/main-page/main-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);

    return (
        <>
            <AppHeader/>
            <main className={styles.containerBurger}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/profile" element={<ProtectedRouteElement><ProfilePage/></ProtectedRouteElement>}/>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                </Routes>

            </main>
        </>
    );
}

export default App;
