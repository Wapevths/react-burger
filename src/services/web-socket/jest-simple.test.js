import {orderLineInitialState, orderLineReducer, WebSocketStatus} from './reducer';
import {
    wsOrderLineConnecting,
    wsOrderLineOpen,
    wsOrderLineClose,
    wsOrderLineError,
    wsOrderLineMessage,
} from './actions';

describe('orderLineReducer', () => {

    it('should handle wsOrderLineConnecting', () => {
        const action = wsOrderLineConnecting();
        const newState = orderLineReducer(orderLineInitialState, action);
        expect(newState.status).toEqual(WebSocketStatus.CONNECTING);
    });

    it('should handle wsOrderLineOpen', () => {
        const action = wsOrderLineOpen();
        const newState = orderLineReducer(orderLineInitialState, action);
        expect(newState.status).toEqual(WebSocketStatus.ONLINE);
        expect(newState.error).toEqual('');
    });

    it('should handle wsOrderLineClose', () => {
        const action = wsOrderLineClose();
        const newState = orderLineReducer(orderLineInitialState, action);
        expect(newState.status).toEqual(WebSocketStatus.OFFLINE);
    });

    it('should handle wsOrderLineError', () => {
        const errorMessage = 'Sample error message';
        const action = wsOrderLineError(errorMessage);
        const newState = orderLineReducer(orderLineInitialState, action);
        expect(newState.status).toEqual(WebSocketStatus.OFFLINE);
        expect(newState.error).toEqual(errorMessage);
    });

    it('should handle wsOrderLineMessage', () => {
        const orderLineData = {
            success: true,
            orders: [{ id: 1, product: 'Product A' }],
            total: 1,
            totalToday: 1,
        };
        const action = wsOrderLineMessage(orderLineData);
        const newState = orderLineReducer(orderLineInitialState, action);
        expect(newState.orderLineData).toEqual(orderLineData);
    });
});
