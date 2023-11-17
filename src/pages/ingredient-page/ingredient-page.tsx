import React, {useEffect, useState} from 'react';
import styles from "./ingredient-page.module.css";
import {useParams} from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {ITypesIngredient} from "../../utils/types-ingredient";
import {useAppSelector} from "../../hooks/redux-hooks";

const IngredientPage = () => {
    const ingredient = useAppSelector((state) => state.ingredients.ingredients)
    const [date, setDate] = useState<null|object>(null);
    const params = useParams()
    useEffect(()=> {
        if (ingredient.length > 0) {
            setDate(ingredient.find((item:ITypesIngredient) => item._id === params.id))
        }
    }, [ingredient])

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