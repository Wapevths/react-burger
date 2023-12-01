import {Dispatch, nanoid} from "@reduxjs/toolkit";
import {request} from "../../utils/fetch-request";
import {ITypesIngredient} from "../../utils/types-ingredient";
import {getCookie} from "../../utils/cookie";

export const GET_INGREDIENTS_REQUEST:'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS:'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR:'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR'
export const POST_ORDER_INGREDIENTS_REQUEST:'POST_ORDER_INGREDIENTS_REQUEST' = 'POST_ORDER_INGREDIENTS_REQUEST'
export const POST_ORDER_INGREDIENTS_SUCCESS:'POST_ORDER_INGREDIENTS_SUCCESS' = 'POST_ORDER_INGREDIENTS_SUCCESS'
export const POST_ORDER_INGREDIENTS_ERROR:'POST_ORDER_INGREDIENTS_ERROR' = 'POST_ORDER_INGREDIENTS_ERROR'

export const ADD_INGREDIENT:'ADD_INGREDIENT' = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT:'DELETE_INGREDIENT' = 'DELETE_INGREDIENT'
export const GET_SELECT_INGREDIENT:'GET_SELECT_INGREDIENT' = 'GET_SELECT_INGREDIENT'
export const SORT_INGREDIENT:'SORT_INGREDIENT' = 'SORT_INGREDIENT'
export const addIngredient = (ingredientObj:ITypesIngredient) => ({
    type: ADD_INGREDIENT,
    payload: {...ingredientObj, uniqId: nanoid()}
})

export const getIngredients = () => (dispatch:Dispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    request('/ingredients')
        .then(res => dispatch({type: GET_INGREDIENTS_SUCCESS, payload: res.data}))
        .catch(err => {
            console.error(err);
            dispatch({type: GET_INGREDIENTS_ERROR})
        })
}

export const postOrderIngredients = (orderIDAllIngredient:string, openModal: () => void) => (dispatch:Dispatch) => {
    dispatch({type: POST_ORDER_INGREDIENTS_REQUEST})
    request('/orders', {
        method: "POST",
        body: JSON.stringify({ingredients: orderIDAllIngredient}),
        headers: {
            "Authorization": `Bearer ${getCookie('token')}`,
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
