import React from 'react';
import './App.css';
import {date} from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {

    return (
    <div className="App">
      <AppHeader/>
      <div className="containerBurger">
          <BurgerIngredients data={date} />
          <BurgerConstructor data={date}/>
      </div>

    </div>
  );
}

export default App;
