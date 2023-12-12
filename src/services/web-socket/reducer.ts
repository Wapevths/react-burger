import { createReducer } from "@reduxjs/toolkit";
import {
    IOrderLineData,
    wsOrderLineClose,
    wsOrderLineConnecting,
    wsOrderLineError, wsOrderLineMessage,
    wsOrderLineOpen
} from "./actions";

export enum WebSocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}

interface IOrderLineState {
    status: WebSocketStatus;
    orderLineData: IOrderLineData;
    error: string;
}

export const orderLineInitialState: IOrderLineState = {
    status: WebSocketStatus.OFFLINE,
    orderLineData: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },

    error: ''
}

export const orderLineReducer = createReducer(orderLineInitialState, (builder => {
    builder
        .addCase(wsOrderLineConnecting, (state) => {
            state.status = WebSocketStatus.CONNECTING;
        })
        .addCase(wsOrderLineOpen, (state) => {
            state.status = WebSocketStatus.ONLINE;
            state.error = '';
        })
        .addCase(wsOrderLineClose, (state) => {
            state.status = WebSocketStatus.OFFLINE;
        })
        .addCase(wsOrderLineError, (state, action) => {
            state.status = WebSocketStatus.OFFLINE;
            state.error = action.payload;
        })
        .addCase(wsOrderLineMessage, (state, action) => {
            state.orderLineData = action.payload
        })
}))
