// @ts-nocheck
import React, {useEffect, useState} from 'react';
import styles from './order-card.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../hooks/redux-hooks";
import ImageCircle from "../image-circle/image-circle";
import {Link, useLocation} from "react-router-dom";
const OrderCard = ({ingredient, date, numberOrder, name}) => {
    const ingredientStore = useAppSelector(state => state.ingredients.ingredients)
    const ingredientsImage:string[] = []
    let allIngredientPrice:number = 0
    const location = useLocation()

    ingredient.forEach((ingredientId) => {
        const foundIngredient = ingredientStore.find(
            (ingredient) => {
                return ingredient._id === ingredientId
            }
        );
        if (foundIngredient) {
            allIngredientPrice += foundIngredient.price
            ingredientsImage.push(foundIngredient.image_mobile);
        }
    });

    return (
        <Link to={`${numberOrder}`} state={{ backgroundLocation: location }} className={styles.containerCardOrder}>
            <section className={styles.containerNumberOrderDate}>
                <span className={`text text_type_digits-default`}>
                    #{numberOrder}
                </span>
                <FormattedDate className={`text text_type_main-default text_color_inactive`}
                               date={new Date(date)}
                />
            </section>
            <h3 className={`text text_type_main-medium`}>
                {name}
            </h3>
            <section className={styles.containerBody}>
                <div className={styles.containerImageCircle}>
                    {ingredientsImage.map((item, index) => (
                            <ImageCircle key={index}
                                         image={item}
                                         index={index}
                                         ingredientLength={ingredientsImage.length}
                            />
                        )
                    )}
                </div>

                <div className={styles.containerPrice}>
                    <span className={`text text_type_digits-default`}>
                        {allIngredientPrice}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>

            </section>
        </Link>
    );
};

export default OrderCard;
