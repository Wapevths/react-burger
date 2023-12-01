import React, {useState} from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './detailed-order-element.module.css'

interface IDetailedOrderElementProps {
    image: string,
    price: number,
    name: string
}

const DetailedOrderElement = ({image, price, name}:IDetailedOrderElementProps) => {

    return (
        <div className={styles.containerDetailedOrderElement}>
            <section className={styles.containerImage}>
                <img src={image} alt="ingredient_image"/>
            </section>

            <span className={`${styles.nameIngredient} text text_type_main-default`}>
                {name}
            </span>

            <section className={`${styles.containerPriceCount} text text_type_digits-default`}>
                <span>1</span>
                <span>x</span>
                <span>{price}</span>
                <CurrencyIcon type="primary" />
            </section>
        </div>
    );
};

export default DetailedOrderElement;
