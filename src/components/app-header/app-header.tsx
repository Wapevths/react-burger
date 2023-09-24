import React from 'react';
// @ts-ignore
import styles from './app-header.module.css'
import {Logo, ProfileIcon, BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <nav className={`${styles.navigateContainer} pt-4 pb-4`}>
            <div className={styles.containerButton}>
                <a href="#" className={styles.containerIconText}>
                    <BurgerIcon type="primary"/>
                    <p className={`${styles.baseText} text text_type_main-default`}>
                        Конструктор
                    </p>
                </a>
                <a href="#" className={styles.containerIconText}>
                    <ListIcon type="secondary"/>
                    <p className={`${styles.secondaryText} text text_type_main-default`}>
                        Лента заказов
                    </p>
                </a>
            </div>
            <div className={styles.containerLogo}>
                <Logo/>
            </div>
            <a href="#" className={styles.containerIconText}>
                <ProfileIcon type="secondary"/>
                <p className={`${styles.secondaryText} text text_type_main-default`}>
                    Личный кабинет
                </p>
            </a>
        </nav>
    );
};

export default AppHeader;