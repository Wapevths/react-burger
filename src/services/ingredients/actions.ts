import {nanoid} from "@reduxjs/toolkit";
import {request} from "../../utils/fetch-request";
import {ITypesIngredient} from "../../utils/types-ingredient";

export const GET_INGREDIENTS_REQUEST:string = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS:string = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR:string = 'GET_INGREDIENTS_ERROR'
export const POST_ORDER_INGREDIENTS_REQUEST:string = 'POST_ORDER_INGREDIENTS_REQUEST'
export const POST_ORDER_INGREDIENTS_SUCCESS:string = 'POST_ORDER_INGREDIENTS_SUCCESS'
export const POST_ORDER_INGREDIENTS_ERROR:string = 'POST_ORDER_INGREDIENTS_ERROR'

export const ADD_INGREDIENT:string = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT:string = 'DELETE_INGREDIENT'
export const GET_SELECT_INGREDIENT:string = 'GET_SELECT_INGREDIENT'
export const SORT_INGREDIENT:string = 'SORT_INGREDIENT'
export const addIngredient = (ingredientObj:ITypesIngredient) => ({
    type: ADD_INGREDIENT,
    payload: {...ingredientObj, uniqId: nanoid()}
})

export const getIngredients = () => (dispatch:any) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    request('/ingredients')
        .then(res => dispatch({type: GET_INGREDIENTS_SUCCESS, payload: res.data}))
        .catch(err => {
            console.error(err);
            dispatch({type: GET_INGREDIENTS_ERROR})
        })
}

export const postOrderIngredients = (orderIDAllIngredient:string, openModal: () => void) => (dispatch:any) => {
    dispatch({type: POST_ORDER_INGREDIENTS_REQUEST})
    request('/orders', {
        method: "POST",
        body: JSON.stringify({ingredients: orderIDAllIngredient}),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => {
            console.log(res)
            dispatch({type: POST_ORDER_INGREDIENTS_SUCCESS, payload: res})
            openModal();
        })
        .catch((err) => {
            dispatch({type: POST_ORDER_INGREDIENTS_ERROR})
            console.error(err)
        });
}
