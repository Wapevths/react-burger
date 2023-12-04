import {nanoid} from "@reduxjs/toolkit";
import {request} from "../../utils/fetch-request";
import {ITypesIngredient} from "../../utils/types-ingredient";
import {getCookie} from "../../utils/cookie";
import {AppDispatch} from "../store";

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

export interface I_GET_INGREDIENTS_REQUEST_ACTION {
  readonly type: typeof GET_INGREDIENTS_REQUEST,
}
export interface I_GET_INGREDIENTS_SUCCESS_ACTION {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  payload: ITypesIngredient[]
}
export interface I_GET_INGREDIENTS_ERROR_ACTION {
  readonly type: typeof GET_INGREDIENTS_ERROR,
}
export interface I_POST_ORDER_INGREDIENTS_REQUEST_ACTION {
  readonly type: typeof POST_ORDER_INGREDIENTS_REQUEST,
}
export interface I_POST_ORDER_INGREDIENTS_SUCCESS_ACTION {
  readonly type: typeof POST_ORDER_INGREDIENTS_SUCCESS,
  payload: string
}
export interface I_POST_ORDER_INGREDIENTS_ERROR_ACTION {
  readonly type: typeof POST_ORDER_INGREDIENTS_ERROR,
}
export interface I_ADD_INGREDIENT_ACTION {
  readonly type: typeof ADD_INGREDIENT,
  payload: ITypesIngredient
}
export interface I_DELETE_INGREDIENT_ACTION {
  readonly type: typeof DELETE_INGREDIENT,
  payload: ITypesIngredient
}
export interface I_GET_SELECT_INGREDIENT_ACTION {
  readonly type: typeof GET_SELECT_INGREDIENT,
  payload: string
}
export interface I_SORT_INGREDIENT_ACTION {
  readonly type: typeof SORT_INGREDIENT,
  payload: ITypesIngredient
}
export type TTypesAction =
    I_GET_INGREDIENTS_REQUEST_ACTION |
    I_GET_INGREDIENTS_SUCCESS_ACTION |
    I_GET_INGREDIENTS_ERROR_ACTION |
    I_POST_ORDER_INGREDIENTS_REQUEST_ACTION |
    I_POST_ORDER_INGREDIENTS_SUCCESS_ACTION |
    I_POST_ORDER_INGREDIENTS_ERROR_ACTION |
    I_ADD_INGREDIENT_ACTION |
    I_DELETE_INGREDIENT_ACTION |
    I_GET_SELECT_INGREDIENT_ACTION |
    I_SORT_INGREDIENT_ACTION


export const getIngredients = () => (dispatch:AppDispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    request('/ingredients')
        .then(res => dispatch({type: GET_INGREDIENTS_SUCCESS, payload: res.data}))
        .catch(err => {
            console.error(err);
            dispatch({type: GET_INGREDIENTS_ERROR})
        })
}

export const postOrderIngredients = (orderIDAllIngredient:{}, openModal: () => void) => (dispatch:AppDispatch) => {
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
