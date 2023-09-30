import React from 'react';
// @ts-ignore
import styles from './app-header.module.css'
import {Logo, ProfileIcon, BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <header className={`${styles.navigateContainer} pt-4 pb-4`}>
            <nav className={styles.containerButton}>
                <a href="#" className={styles.containerIconText}>
                    <BurgerIcon type="primary"/>
                    <span className={`${styles.baseText} text text_type_main-default`}>
                        Конструктор
                    </span>
                </a>
                <a href="#" className={styles.containerIconText}>
                    <ListIcon type="secondary"/>
                    <span className={`${styles.secondaryText} text text_type_main-default`}>
                        Лента заказов
                    </span>
                </a>
            </nav>
            <a href={"#"} className={styles.containerLogo}>
                <Logo/>
            </a>
            <a href="#" className={styles.containerIconText}>
                <ProfileIcon type="secondary"/>
                <span className={`${styles.secondaryText} text text_type_main-default`}>
                    Личный кабинет
                </span>
            </a>
        </header>
    );
};

export default AppHeader;