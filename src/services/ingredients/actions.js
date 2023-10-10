import {nanoid} from "@reduxjs/toolkit";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'

export const addIngredient = (ingredientObj) => ({type: ADD_INGREDIENT, payload: {...ingredientObj, uniqId: nanoid()} })

export const getIngredients = () => (dispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    fetch('https://norma.nomoreparties.space/api/ingredients')
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(res => dispatch({type: GET_INGREDIENTS_SUCCESS, payload: res.data}))
        .catch(err => {console.error(err); dispatch({type: GET_INGREDIENTS_ERROR})})
}