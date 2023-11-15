import React from 'react';
import PropTypes from 'prop-types';
import styles from './card-ingredients.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";

import {getConstructorIngredients} from "../../services/ingredients/selectors";
import {Link, useLocation} from "react-router-dom";
import {ITypesIngredient} from "../../utils/types-ingredient";

interface ICardIngredientsProps {
    ingredient: ITypesIngredient
    getIngredient: () => void
}
const CardIngredients = (props:any) => {
    const constructorIngredients = useSelector(getConstructorIngredients)
    let counterIngredient = 0
    const getModal = () => {
        props.getIngredient(props.ingredient)
    }
    const location = useLocation()
    for (let i = 0; i < constructorIngredients.length; i++) {
        if (constructorIngredients[i]._id === props.ingredient._id) {
            counterIngredient++
        }
    }

    const [  , dragRef] = useDrag<
        ITypesIngredient,
        void,
        { isDrag: any }
    >({
        type: 'ingredient',
        item: props.ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    })


    return (
        <Link to={`ingredients/${props.ingredient._id}`} state={{ backgroundLocation: location }} className={`${styles.containerCardIngredients}`} ref={dragRef} onClick={getModal}>
            <img src={props.ingredient.image} alt={props.ingredient.name}/>
            <div className={styles.containerPrice}>
                <span className={`text text_type_digits-default`}>
                    {props.ingredient.price}
                </span>
                <CurrencyIcon type={"primary"}/>
            </div>
            <span className={`text text_type_main-default ${styles.nameIngredient}`}>{props.ingredient.name}</span>
            {counterIngredient >= 1 && (
                <Counter count={counterIngredient}
                         size="default"
                         extraClass={styles.cardCounterIngredients}
                />
            )}
        </Link>
);
};

CardIngredients.propTypes = {
    ingredient: PropTypes.object.isRequired,
    getIngredient: PropTypes.func.isRequired
};

export default CardIngredients;