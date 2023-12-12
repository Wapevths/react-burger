import {request} from "../../utils/fetch-request";
import {AppDispatch} from "../store";
import {IOrderData} from "../web-socket/actions";

export const GET_DETAILED_ORDER_REQUEST:"GET_DETAILED_ORDER_REQUEST" = "GET_DETAILED_ORDER_REQUEST"
export const GET_DETAILED_ORDER_SUCCESS:"GET_DETAILED_ORDER_SUCCESS" = "GET_DETAILED_ORDER_SUCCESS"
export const GET_DETAILED_ORDER_ERROR:"GET_DETAILED_ORDER_ERROR" = "GET_DETAILED_ORDER_ERROR"

export interface IGet_Detailed_Order_Request_Action {
    readonly type: typeof GET_DETAILED_ORDER_REQUEST
}
export interface IGet_Detailed_Order_Success_Action {
    readonly type: typeof GET_DETAILED_ORDER_SUCCESS,
    payload: IOrderData
}
export interface IGet_Detailed_Order_Error_Action {
    readonly type: typeof GET_DETAILED_ORDER_ERROR
}

export type TTodoActions =
    | IGet_Detailed_Order_Request_Action
    | IGet_Detailed_Order_Success_Action
    | IGet_Detailed_Order_Error_Action

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