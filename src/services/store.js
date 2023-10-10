import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from './ingredients/reducer'

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
})