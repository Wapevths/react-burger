import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
    const [date, setDate] = useState([])
    useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => setDate(res.data))
            .catch(console.error)
    }, []);

    return (
    <div>
      <AppHeader/>
        <main className={styles.containerBurger}>
            <BurgerIngredients data={date} />
            <BurgerConstructor data={date}/>
        </main>

    </div>
  );
}

export default App;
