import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './detailed-order-element.module.css'

interface IDetailedOrderElementProps {
    image: string,
    price: number,
    name: string,
    count: number
}

const DetailedOrderElement = ({image, price, name, count}:IDetailedOrderElementProps) => {

    return (
        <div className={styles.containerDetailedOrderElement}>
            <section className={styles.containerImage}>
                <img src={image} alt="ingredient_image"/>
            </section>

            <span className={`${styles.nameIngredient} text text_type_main-default`}>
                {name}
            </span>

            <section className={`${styles.containerPriceCount} text text_type_digits-default`}>
                <span>{count}</span>
                <span>x</span>
                <span>{count * price}</span>
                <CurrencyIcon type="primary" />
            </section>
        </div>
    );
};

export default DetailedOrderElement;
