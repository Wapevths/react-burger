import React, {useState} from 'react';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "../card/card";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('Булки')
    const ingredients = ['Булки', 'Соусы', 'Начинки']
    return (
        <main className={`${styles.containerMainBurgerIngredients} pt-10`}>
            <div className={styles.subContainerMainBurgerIngredients}>
                <h1 className={`${styles.titleBurgerIngredients} text text_type_main-large pb-5`}>
                    Соберите бургер
                </h1>
                <section className={`${styles.containerTab} pb-10`}>
                    {ingredients.map((item, index) => (
                        <Tab key={index} active={current === item} value={item} onClick={setCurrent}>
                            {item}
                        </Tab>
                    ))}
                </section>
                <section>

                </section>
            </div>
        </main>
    );
};

export default BurgerIngredients;