import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './card-ingredients.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {getConstructorIngredients} from "../../services/ingredients/selectors";
const CardIngredients = (props) => {
    const constructorIngredients = useSelector(getConstructorIngredients)
    let counterIngredient = 0
    const getModal = () => {
        props.getIngredient(props.ingredient)
    }

    for (let i = 0; i < constructorIngredients.length; i++) {
        if (constructorIngredients[i]._id === props.ingredient._id) {
            counterIngredient++
        }
    }

    const [ { isDrag} , dragRef] = useDrag({
        type: 'ingredient',
        item: props.ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })


    return (
        <div className={`${styles.containerCardIngredients}`} ref={dragRef} onClick={getModal}>
            <img src={props.ingredient.image} alt={props.ingredient.name}/>
            <div className={styles.containerPrice}>
                <span className={`text text_type_digits-default`}>
                    {props.ingredient.price}
                </span>
                <CurrencyIcon type={"primary"}/>
            </div>
            <span className={`text text_type_main-default ${styles.nameIngredient}`}>{props.ingredient.name}</span>
            <Counter count={counterIngredient} size="default" extraClass={styles.cardCounterIngredients} />
        </div>
);
};

CardIngredients.propTypes = {
    ingredient: PropTypes.object.isRequired
};

export default CardIngredients;