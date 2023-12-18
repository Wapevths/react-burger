import styles from './card-ingredients.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux-hooks";
import {ITypesIngredientNotRequired} from "../../utils/types-ingredient-not-required";

interface ICardIngredientsProps {
    ingredient: ITypesIngredientNotRequired
    getIngredient: (ingredient: object ) => void
}
const CardIngredients = ({ingredient, getIngredient}:ICardIngredientsProps) => {
    const constructorIngredients = useAppSelector((state) => state.ingredients.constructorIngredients)
    let counterIngredient = 0
    const getModal = () => {
        getIngredient(ingredient)
    }
    const location = useLocation()
    for (let i = 0; i < constructorIngredients.length; i++) {
        if (constructorIngredients[i]._id === ingredient._id) {
            counterIngredient++
        }
    }

    const [  , dragRef] = useDrag<
        ITypesIngredientNotRequired,
        void,
        { isDrag: any }
    >({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    })


    return (
        <Link to={`ingredients/${ingredient._id}`} id="card_ingredient" state={{ backgroundLocation: location }} className={`${styles.containerCardIngredients}`} ref={dragRef} onClick={getModal}>
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={styles.containerPrice}>
                <span className={`text text_type_digits-default`}>
                    {ingredient.price}
                </span>
                <CurrencyIcon type={"primary"}/>
            </div>
            <span className={`text text_type_main-default ${styles.nameIngredient}`}>{ingredient.name}</span>
            {counterIngredient >= 1 && (
                <Counter count={counterIngredient}
                         size="default"
                         extraClass={styles.cardCounterIngredients}
                />
            )}
        </Link>
);
};

export default CardIngredients;
