import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import styles from "./ingredient-page.module.css";
import {useLocation, useParams} from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const IngredientPage = () => {
    const location = useLocation()
    const ingredient = useSelector(state => state.ingredients.ingredients)
    const [date, setDate] = useState(null);
    const params = useParams()
    useEffect(()=> {
        if (ingredient.length > 0) {
            setDate(ingredient.find(item => item._id === params.id))
        }
    }, [ingredient])

    useEffect(() => {
        console.log(date)
    }, [date]);

    return (
        <>
            {date !== null ? (
                <div className={styles.ingredientPageContainer}>
                    <IngredientDetails data={date}/>
                </div>
            ) : (
                <>
                    Загрузка
                </>
            )}
        </>
    );
};

export default IngredientPage;