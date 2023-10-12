import React, {useEffect, useRef, useState} from 'react';
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

    const containerRef = useRef(null);

    const ingredients = [
        {name: 'Булки', type: 'bun'},
        {name: 'Соусы', type: 'sauce'},
        {name: 'Начинки', type: 'main'}
    ]

    const setTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    };

    const {bunRef, bunInView, bunEntry} = useInView({
        threshold: 0,
    });
    const {mainRef, mainInView, mainEntry} = useInView({
        threshold: 0,
    });
    const {sauceRef, sauceInView, sauceEntry} = useInView({
        threshold: 0,
    });

    const getIngredient = (ingredientObj) => {
        openModal()
        dispatch({type: GET_SELECT_INGREDIENT, payload: ingredientObj})
    }

    useEffect(() => {
        console.log(bunEntry)
        if (bunInView) {
            console.log(123)
        } else if (sauceInView) {
            console.log(321)
        }
    }, [bunInView, mainInView, sauceInView]);


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
                    <div className={`pl-4 pb-10`}>
                        <h2 className={`pb-6 text text_type_main-medium`} ref={bunRef}>
                            Булки
                        </h2>
                        <section className={`${styles.ingredients}`}>
                            {data.filter(item => item.type === 'bun').map((item, index) => (
                                <CardIngredients ingredient={item}
                                                 getIngredient={getIngredient}
                                                 key={item._id}
                                />
                            ))}
                        </section>
                    </div>
                    <div className={`pl-4 pb-10`}>
                        <h2 className={`pb-6 text text_type_main-medium`} ref={sauceRef}>
                            Соусы
                        </h2>
                        <section className={`${styles.ingredients}`}>
                            {data.filter(item => item.type === 'sauce').map((item, index) => (
                                <CardIngredients ingredient={item}
                                                 getIngredient={getIngredient}
                                                 key={item._id}
                                />
                            ))}
                        </section>
                    </div>
                    <div className={`pl-4 pb-10`}>
                        <h2 className={`pb-6 text text_type_main-medium`} ref={mainRef}>
                            Начинки
                        </h2>
                        <section className={`${styles.ingredients}`}>
                            {data.filter(item => item.type === 'main').map((item, index) => (
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