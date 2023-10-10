import React, {useEffect, useState} from 'react';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import CardIngredients from "../card-ingredients/card-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useModal} from "../../hooks/useModal";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient} from "../../services/ingredients/actions";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('Булки')

    const data = useSelector(state => state.ingredients.ingredients)
    const [selectIngredient, setSelectIngredient] = useState({})
    const { isModalOpen, openModal, closeModal } = useModal();
    const dispatch = useDispatch()

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

    // onDrop
    // dispatch(addIngredient(ingredientObj))
    const getIngredient = (ingredientObj) => {
        openModal()
        dispatch(addIngredient(ingredientObj))
        setSelectIngredient(ingredientObj)
    }


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
                                {data.filter(item => item.type === ingredient.type).map((item, index) => (
                                    <CardIngredients ingredient={item}
                                                     getIngredient={getIngredient}
                                                     key={item._id}
                                    />
                                ))}
                            </section>
                        </div>
                    ))}
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
BurgerIngredients.propTypes = {
};

export default BurgerIngredients;