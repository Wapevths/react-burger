//@ts-nocheck
//TODO
import React from 'react';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './detailed-order.module.css'
import {useAppSelector} from "../../hooks/redux-hooks";
import DetailedOrderElement from "../detailed-order-element/detailed-order-element";

interface IDetailedOrderProps {
    numberPositionCenter?: boolean,
    numberOrder: number,
    statusOrder: string,
    name: string,
    date: string,
    ingredients: {}[]
}

const DetailedOrder = ({numberPositionCenter = true, numberOrder, statusOrder, name, date, ingredients}:IDetailedOrderProps) => {
    const ingredientStore = useAppSelector(state => state.ingredients.ingredients)
    const ingredientsImage:string[] = []
    const ingredientsName:string[] = []
    let allIngredientPrice:number = 0
    const priceIngredient:number[] = []
    ingredients?.forEach((ingredientId) => {
        const foundIngredient = ingredientStore.find(
            (ingredient) => {
                return ingredient._id === ingredientId
            }
        );
        if (foundIngredient) {
            allIngredientPrice += foundIngredient.price
            ingredientsImage.push(foundIngredient.image_mobile);
            priceIngredient.push(foundIngredient.price)
            ingredientsName.push(foundIngredient.name)
        }

    });

    return (
        <div className={styles.containerDetailedOrder}>
            <span className={`${styles.orderNumber} text text_type_digits-default pb-10`} style={{justifyContent: numberPositionCenter ? "center" : "start"}}>
                #{numberOrder}
            </span>

            <h2 className={`pb-3 text text_type_main-medium`}>
                {name}
            </h2>

            <span className={`pb-15 text text_type_main-default ${styles.statusOrder}`}>
                {statusOrder === "done" ? "Выполнен" : statusOrder === "pending" ? "В работе" : "Создан"}
            </span>

            <h3 className={`pb-6 text text_type_main-medium`}>
                Состав:
            </h3>

            <section className={`custom-scroll pr-6 ${styles.containerBodyElement}`}>
                {ingredientsImage.map((item, index) => (
                        <DetailedOrderElement image={item}
                                              price={priceIngredient[index]}
                                              name={ingredientsName[index]}
                                              key={index}
                        />
                ))}
            </section>

            <section className={`pt-10 ${styles.containerDatePrice}`}>
                <FormattedDate className={`text text_type_main-default text_color_inactive`}
                               date={new Date(date)}
                />
                <div className={styles.containerPrice}>
                    <span className={`text text_type_digits-default`}>
                        {allIngredientPrice}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </section>
        </div>
    );
};

export default DetailedOrder;
