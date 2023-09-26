import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './card-ingredients.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const CardIngredients = (props) => {
    const [counter, setCounter] = useState(1)
    return (
        <div className={`${styles.containerCardIngredients}`}>
            <img src={props.image} alt={props.name}/>
            <div className={styles.containerPrice}>
                <p className={`text text_type_digits-default`}>{props.price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <p className={`text text_type_main-default`}>{props.name}</p>
            <Counter count={counter} size="default" extraClass={styles.cardCounterIngredients} />
        </div>
    );
};

CardIngredients.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string
};

export default CardIngredients;