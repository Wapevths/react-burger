import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from './ingredients/reducer'
import usersReducer from './ingredients/reducer'

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    users: usersReducer
});

export const store = configureStore({
    reducer: rootReducer,
})