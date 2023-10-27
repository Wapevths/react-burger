import React, {useEffect, useState} from 'react';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredients from "../card-ingredients/card-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useModal} from "../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {GET_SELECT_INGREDIENT} from "../../services/ingredients/actions";
import {useInView} from "react-intersection-observer";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('Булки')

    const data = useSelector(state => state.ingredients.ingredients)
    const selectIngredient = useSelector(state => state.ingredients.selectIngredient)
    const {isModalOpen, openModal, closeModal} = useModal();
    const dispatch = useDispatch()


    const ingredients = [
        {name: 'Булки', type: 'bun'},
        {name: 'Соусы', type: 'sauce'},
        {name: 'Начинки', type: 'main'}
    ]

    // const setTab = (tab) => {
    //     setCurrent(tab);
    //     const element = document.getElementById(tab);
    //     if (element) {
    //         element.scrollIntoView({behavior: "smooth"});
    //     }
    // };

    const [bunRef, bunInView] = useInView({
        threshold: 0.6,
    });
    const [mainRef, mainInView] = useInView({
        threshold: 0.4,
    });
    const [sauceRef, sauceInView] = useInView({
        threshold: 1,
    });

    const getIngredient = (ingredientObj) => {
        openModal()
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
                    {ingredients.map((item, index) => (
                        <Tab key={index} active={current === item.name} value={item.name}>
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
                            {data.filter(item => item.type === 'bun').map((item) => (
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
                            {data.filter(item => item.type === 'sauce').map((item) => (
                                    <CardIngredients ingredient={item}
                                                     getIngredient={getIngredient}
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
                            {data.filter(item => item.type === 'main').map((item) => (
                                    <CardIngredients ingredient={item}
                                                     getIngredient={getIngredient}
                                                     key={item._id}
                                    />
                            ))}
                        </section>
                    </div>
                </section>
            </div>
            {isModalOpen && (
                <Modal title="Детали ингредиента" setActive={closeModal}>
                    <IngredientDetails data={selectIngredient}/>
                </Modal>
            )}

        </main>
    );
};

export default BurgerIngredients;