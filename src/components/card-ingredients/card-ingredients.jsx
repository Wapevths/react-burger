import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './card-ingredients.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const CardIngredients = (props) => {
    const [counter, setCounter] = useState(1)
    return (
        <div className={`${styles.containerCardIngredients}`}>
            <img src={props.ingredient.image} alt={props.ingredient.name}/>
            <div className={styles.containerPrice}>
                <span className={`text text_type_digits-default`}>{props.ingredient.price}</span>
                <CurrencyIcon type={"primary"}/>
            </div>
            <span className={`text text_type_main-default`}>{props.ingredient.name}</span>
            <Counter count={counter} size="default" extraClass={styles.cardCounterIngredients} />
        </div>
    );
};

CardIngredients.propTypes = {
    ingredient: PropTypes.object.isRequired
};

export default CardIngredients;