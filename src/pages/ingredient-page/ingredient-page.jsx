import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import styles from "./ingredient-page.module.css";
import {useLocation} from "react-router-dom";

const IngredientPage = () => {
    const location = useLocation()
    const ingredient = useSelector(state => state.ingredients.ingredients)
    const [date, setDate] = useState(null);
    useEffect(()=> {
        if (ingredient.length > 0) {
            setDate(ingredient.find(item => item._id === location?.pathname?.split('/')[2]))
        }
    }, [ingredient])

    useEffect(() => {
        console.log(date)
    }, [date]);

    return (
        <>
            {date !== null ? (

                <div className={styles.containerIngredientDetails}>
                    <h2 className={`text text_type_main-large`}>
                        Детали ингредиента
                    </h2>
                    <img className={styles.imageIngredient} src={date.image_large} alt={date.name}/>
                    <span className={`pt-4 pb-8 text text_type_main-medium ${styles.nameIngredient}`}>
                {date.name}
            </span>
                    <section className={`text text_type_main-default ${styles.containerComposition}`}>
                        <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Калории,ккал
                    </span>
                            <span className={`text text_type_digits-default`}>
                        {date.calories}
                    </span>
                        </div>
                        <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Белки, г
                    </span>
                            <span className={`text text_type_digits-default`}>
                        {date.proteins}
                    </span>
                        </div>
                        <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Жиры, г
                    </span>
                            <span className={`text text_type_digits-default`}>
                        {date.fat}
                    </span>
                        </div>
                        <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Углеводы, г
                    </span>
                            <span className={`text text_type_digits-default`}>
                        {date.carbohydrates}
                    </span>
                        </div>
                    </section>
                </div>
            ) : (
                <>
                    Загрузка
                </>
            )}
            {/*{ingredient.find(item => item._id === location?.pathname?.split('/')[2] ? (*/}
            {/*    <>*/}
            {/*        {item._id}*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <>*/}
            {/*        321*/}
            {/*    </>*/}
            {/*) )}*/}
        </>
    );
};

export default IngredientPage;