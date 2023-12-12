import {createAction} from "@reduxjs/toolkit";
export const ORDER_LINE_CONNECTION: 'ORDER_LINE_CONNECTION' = 'ORDER_LINE_CONNECTION';
export const ORDER_LINE_DISCONNECT: 'ORDER_LINE_DISCONNECT' = 'ORDER_LINE_DISCONNECT';
export const WS_ORDER_LINE_CONNECTING: 'WS_ORDER_LINE_CONNECTING' = 'WS_ORDER_LINE_CONNECTING';
export const WS_ORDER_LINE_OPEN: 'WS_ORDER_LINE_OPEN' = 'WS_ORDER_LINE_OPEN';
export const WS_ORDER_LINE_MESSAGE: 'WS_ORDER_LINE_MESSAGE' = 'WS_ORDER_LINE_MESSAGE';
export const WS_ORDER_LINE_CLOSE: 'WS_ORDER_LINE_CLOSE' = 'WS_ORDER_LINE_CLOSE';
export const WS_ORDER_LINE_ERROR: 'WS_ORDER_LINE_ERROR' = 'WS_ORDER_LINE_ERROR';

export interface IOrderData {
    ingredients: string[];
    name: string;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderLineData {
    success: boolean;
    orders: IOrderData[];
    total: number;
    totalToday: number;
}

//принимает экшен, в дженерике принимает 2 типа: тип payload и тип action. Тип action можно передать просто строкой без typeof
const orderLineConnect = createAction<string, typeof ORDER_LINE_CONNECTION>(ORDER_LINE_CONNECTION);
const orderLineDisconnect = createAction<undefined, typeof ORDER_LINE_DISCONNECT>(ORDER_LINE_DISCONNECT);
const wsOrderLineConnecting = createAction<undefined, typeof WS_ORDER_LINE_CONNECTING>(WS_ORDER_LINE_CONNECTING);
const wsOrderLineOpen = createAction<undefined, typeof WS_ORDER_LINE_OPEN>(WS_ORDER_LINE_OPEN);
const wsOrderLineMessage = createAction<IOrderLineData, typeof WS_ORDER_LINE_MESSAGE>(WS_ORDER_LINE_MESSAGE);
const wsOrderLineClose = createAction<undefined, typeof WS_ORDER_LINE_CLOSE>(WS_ORDER_LINE_CLOSE);
const wsOrderLineError = createAction<string, typeof WS_ORDER_LINE_ERROR>(WS_ORDER_LINE_ERROR);

export type UTOrderLineActions =
    ReturnType<typeof orderLineConnect> |
    ReturnType<typeof orderLineDisconnect> |
    ReturnType<typeof wsOrderLineConnecting> |
    ReturnType<typeof wsOrderLineOpen> |
    ReturnType<typeof wsOrderLineMessage> |
    ReturnType<typeof wsOrderLineClose> |
    ReturnType<typeof wsOrderLineError>;

export const wsActions = {
    wsConnect: orderLineConnect,
    wsDisconnect: orderLineDisconnect,
    wsConnecting: wsOrderLineConnecting,
    onOpen: wsOrderLineOpen,
    onClose: wsOrderLineClose,
    onError: wsOrderLineError,
    onMessage: wsOrderLineMessage,
}

export {
    orderLineConnect,
    orderLineDisconnect,
    wsOrderLineConnecting,
    wsOrderLineOpen,
    wsOrderLineMessage,
    wsOrderLineClose,
    wsOrderLineError,
}
