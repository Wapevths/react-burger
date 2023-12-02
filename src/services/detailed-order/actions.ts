import {request} from "../../utils/fetch-request";
import {Dispatch} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";

export const GET_DETAILED_ORDER_REQUEST:"GET_DETAILED_ORDER_REQUEST" = "GET_DETAILED_ORDER_REQUEST"
export const GET_DETAILED_ORDER_SUCCESS:"GET_DETAILED_ORDER_SUCCESS" = "GET_DETAILED_ORDER_SUCCESS"
export const GET_DETAILED_ORDER_ERROR:"GET_DETAILED_ORDER_ERROR" = "GET_DETAILED_ORDER_ERROR"


export const getDetailedOrder = (id: string) => (dispatch:AppDispatch) => {
    dispatch({type: GET_DETAILED_ORDER_REQUEST})
    request(`/orders/${id}`)
        .then((response) => {
            dispatch({type: GET_DETAILED_ORDER_SUCCESS, payload: response.orders})
        })
        .catch((err) => {
            dispatch({type: GET_DETAILED_ORDER_ERROR})
            console.error(err)
        });
}