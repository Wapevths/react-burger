import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from './ingredients/reducer'
import usersReducer from './users/reducer'
import detailedOrderReducer from './detailed-order/reducer'
import { orderLineReducer } from "./web-socket/reducer";
import {socketMiddleware} from "./middleware/socket-middleware";
import { wsActions } from "./web-socket/actions";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    users: usersReducer,
    detailedOrder: detailedOrderReducer,
    orderLineDate: orderLineReducer
});

// @ts-ignore
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsActions))
})

// @ts-ignore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch