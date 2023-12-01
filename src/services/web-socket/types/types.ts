export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

import {ITypesIngredient} from "../../../utils/types-ingredient";

export type Live = Array<ITypesIngredient>;

export enum LiveActionType {
    DATA = 'data',          //обновление всей таблицы
    INSERT = 'insert',      //вставка одной или нескольких строк
}

export type Data = {
    type: LiveActionType.DATA,
    data: Live
}

export type Insert = {
    type: LiveActionType.INSERT,
    data: {
        rows: Array<ITypesIngredient>,
        pos: number
    }
}



export type LiveAction = Insert | Data;

export type LiveActions = Array<LiveAction>;

