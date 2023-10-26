import React from 'react';
// @ts-ignore
import styles from './app-header.module.css'
import {Logo, ProfileIcon, BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className={`${styles.navigateContainer} pt-4 pb-4`}>
            <nav className={styles.containerButton}>
                <NavLink to="/" className={styles.containerIconText}>
                    {({isActive}) => (
                        <>
                            <BurgerIcon type={isActive ? "primary" : "secondary"}/>
                            <span className={`${isActive ? styles.baseText : styles.secondaryText} text text_type_main-default`}>
                                Конструктор
                            </span>
                        </>
                    )}

                </NavLink>
                <NavLink to="/" className={styles.containerIconText}>
                    <ListIcon type="secondary"/>
                    <span className={`${styles.secondaryText} text text_type_main-default`}>
                        Лента заказов
                    </span>
                </NavLink>
            </nav>
            <Link to='/' className={styles.containerLogo}>
                <Logo/>
            </Link>
            <NavLink to="/profile" className={styles.containerIconText}>
                {({isActive}) => (
                    <>
                        <ProfileIcon type={isActive ? "primary" : "secondary"}/>
                        <span className={`${isActive ? styles.baseText : styles.secondaryText} text text_type_main-default`}>
                            Личный кабинет
                        </span>
                    </>
                )}


            </NavLink>
        </header>
    );
};

export default AppHeader;