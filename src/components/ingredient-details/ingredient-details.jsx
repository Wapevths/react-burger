import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css'

const IngredientDetails = (props) => {
    return (
        <div className={styles.containerIngredientDetails}>
            <img className={styles.imageIngredient} src={props.data.image_large} alt={props.data.name}/>
            <span className={`pt-4 pb-8 text text_type_main-medium ${styles.nameIngredient}`}>
                {props.data.name}
            </span>
            <section className={`text text_type_main-default ${styles.containerComposition}`}>
                <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Калории,ккал
                    </span>
                    <span className={`text text_type_digits-default`}>
                        {props.data.calories}
                    </span>
                </div>
                <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Белки, г
                    </span>
                    <span className={`text text_type_digits-default`}>
                        {props.data.proteins}
                    </span>
                </div>
                <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Жиры, г
                    </span>
                    <span className={`text text_type_digits-default`}>
                        {props.data.fat}
                    </span>
                </div>
                <div className={`${styles.subContainerComposition}`}>
                    <span>
                        Углеводы, г
                    </span>
                    <span className={`text text_type_digits-default`}>
                        {props.data.carbohydrates}
                    </span>
                </div>
            </section>
        </div>
    );
};

IngredientDetails.propTypes = {
    data: PropTypes.object.isRequired
};

export default IngredientDetails;