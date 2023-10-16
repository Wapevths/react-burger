import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/ingredients/actions";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);

    return (
        <div>
            <AppHeader/>
            <main className={styles.containerBurger}>
                <BurgerIngredients />
                <BurgerConstructor/>
            </main>
        </div>
    );
}

export default App;
