import React from 'react';
import styles from './ingredient-details.module.css'
import {ITypesIngredientNotRequired} from "../../utils/types-ingredient-not-required";

interface IIngredientDetailsProps {
    data: ITypesIngredientNotRequired
}
const IngredientDetails = ({data}:IIngredientDetailsProps) => {
    return (
        <div className={styles.containerIngredientDetails}>
            <img className={styles.imageIngredient} src={data.image_large} alt={data.name}/>
            <span className={`pt-4 pb-8 text text_type_main-medium ${styles.nameIngredient}`} id="ingredient-modal-name">
                {data.name}
            </span>
            <section className={`text text_type_main-default ${styles.containerComposition}`}>
                <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Калории,ккал
                    </span>
                    <span id="modal-calories" className={`text text_type_digits-default`}>
                        {data.calories}
                    </span>
                </div>
                <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Белки, г
                    </span>
                    <span id="modal-proteins" className={`text text_type_digits-default`}>
                        {data.proteins}
                    </span>
                </div>
                <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Жиры, г
                    </span>
                    <span id="modal-fat" className={`text text_type_digits-default`}>
                        {data.fat}
                    </span>
                </div>
                <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Углеводы, г
                    </span>
                    <span id="modal-carbohydrates" className={`text text_type_digits-default`}>
                        {data.carbohydrates}
                    </span>
                </div>
            </section>
        </div>
    );
};


export default IngredientDetails;
