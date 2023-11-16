import React, {useEffect, useState} from 'react';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredients from "../card-ingredients/card-ingredients";
import {GET_SELECT_INGREDIENT} from "../../services/ingredients/actions";
import {useInView} from "react-intersection-observer";
import {ITypesIngredient} from "../../utils/types-ingredient";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {ITypesIngredientNotRequired} from "../../utils/types-ingredient-not-required";

const BurgerIngredients = () => {
    const [current, setCurrent] = useState<string>('Булки')

    const data = useAppSelector((state) => state.ingredients.ingredients)
    const dispatch = useAppDispatch()


    const ingredients: {name: string, type: string}[] = [
        {name: 'Булки', type: 'bun'},
        {name: 'Соусы', type: 'sauce'},
        {name: 'Начинки', type: 'main'}
    ]

    const [bunRef, bunInView] = useInView({
        threshold: 0.6,
    });
    const [mainRef, mainInView] = useInView({
        threshold: 0.4,
    });
    const [sauceRef, sauceInView] = useInView({
        threshold: 1,
    });

    const getIngredient = (ingredientObj: ITypesIngredientNotRequired) => {
        dispatch({type: GET_SELECT_INGREDIENT, payload: ingredientObj})
    }

    useEffect(() => {
        if (mainInView) {
            setCurrent('Начинки')
        }
    }, [mainInView]);

    useEffect(() => {
        if (sauceInView) {
            setCurrent('Соусы')
        }
    }, [sauceInView]);

    useEffect(() => {
        if (bunInView) {
            setCurrent('Булки')
        }
    }, [bunInView]);

    return (
        <main className={`${styles.containerMainBurgerIngredients} pt-10`}>
            <div className={styles.subContainerMainBurgerIngredients}>
                <h1 className={`${styles.titleBurgerIngredients} text text_type_main-large pb-5`}>
                    Соберите бургер
                </h1>
                <section className={`${styles.containerTab} pb-10`}>
                    {ingredients.map((item:{name: string, type: string}, index:number) => (
                        <Tab key={index} active={current === item.name} value={item.name} onClick={() => {}}>
                            {item.name}
                        </Tab>
                    ))}
                </section>
                <section className={`custom-scroll ${styles.containerIngredients}`}>
                    <div className={`pl-4 pb-10`} ref={bunRef}>
                        <h2 className={`pb-6 text text_type_main-medium`} >
                            Булки
                        </h2>
                        <section className={`${styles.ingredients}`}>
                            {data.filter((item:ITypesIngredient) => item.type === 'bun').map((item:ITypesIngredient) => (
                                    <CardIngredients ingredient={item}
                                                     key={item._id}
                                                     getIngredient={getIngredient}
                                    />
                            ))}
                        </section>
                    </div>
                    <div className={`pl-4 pb-10`}  ref={sauceRef}>
                        <h2 className={`pb-6 text text_type_main-medium`}>
                            Соусы
                        </h2>
                        <section className={`${styles.ingredients}`}>
                            {data.filter((item:ITypesIngredient) => item.type === 'sauce').map((item:ITypesIngredient) => (
                                    <CardIngredients ingredient={item}
                                                     getIngredient={(ingredient) =>getIngredient(ingredient)}
                                                     key={item._id}
                                    />
                            ))}
                        </section>
                    </div>
                    <div className={`pl-4 mb-10`} ref={mainRef}>
                        <h2 className={`pb-6 text text_type_main-medium`} >
                            Начинки
                        </h2>
                        <section className={`${styles.ingredients}`}>
                            {data.filter((item:ITypesIngredient) => item.type === 'main').map((item:ITypesIngredient) => (
                                    <CardIngredients ingredient={item}
                                                     getIngredient={getIngredient}
                                                     key={item._id}
                                    />
                            ))}
                        </section>
                    </div>
                </section>
            </div>


        </main>
    );
};

export default BurgerIngredients;