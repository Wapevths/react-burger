import React, {useEffect, useState} from 'react';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredients from "../card-ingredients/card-ingredients";
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('Булки')
    const ingredients = [
        {name: 'Булки', type: 'bun'},
        {name: 'Соусы', type: 'sauce'},
        {name: 'Начинки', type: 'main'}
    ]

    const setTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <main className={`${styles.containerMainBurgerIngredients} pt-10`}>
            <div className={styles.subContainerMainBurgerIngredients}>
                <h1 className={`${styles.titleBurgerIngredients} text text_type_main-large pb-5`}>
                    Соберите бургер
                </h1>
                <section className={`${styles.containerTab} pb-10`}>
                    {ingredients.map((item, index) => (
                        <Tab key={index} active={current === item.name} value={item.name}  onClick={setTab}>
                            {item.name}
                        </Tab>
                    ))}
                </section>
                <section className={`custom-scroll ${styles.containerIngredients}`}>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className={`pl-4 pb-10`}>
                           <h2 className={`pb-6 text text_type_main-medium`} id={ingredient.name}>
                               {ingredient.name}
                           </h2>
                            <section className={`${styles.ingredients}`}>
                                {props.data.filter(item => item.type === ingredient.type).map((item) => (
                                    <CardIngredients name={item.name}
                                                     price={item.price}
                                                     type={item.type}
                                                     image={item.image}
                                    />
                                ))}
                            </section>


                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
};
BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired
};

export default BurgerIngredients;