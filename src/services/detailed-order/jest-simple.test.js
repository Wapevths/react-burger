import reducer from './reducer';
import {
    GET_DETAILED_ORDER_REQUEST,
    GET_DETAILED_ORDER_SUCCESS,
    GET_DETAILED_ORDER_ERROR,
} from './actions';

describe('Detailed Order Reducer', () => {
    const initialState = {
        isLoading: false,
        isError: false,
        order: [],
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_DETAILED_ORDER_REQUEST', () => {
        const action = { type: GET_DETAILED_ORDER_REQUEST };
        const expectedState = { ...initialState, order: [], isLoading: true, isError: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DETAILED_ORDER_SUCCESS', () => {
        const mockOrderData = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
        const action = { type: GET_DETAILED_ORDER_SUCCESS, payload: mockOrderData };
        const expectedState = { ...initialState, order: mockOrderData, isLoading: false, isError: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DETAILED_ORDER_ERROR', () => {
        const action = { type: GET_DETAILED_ORDER_ERROR };
        const expectedState = { ...initialState, order: [], isLoading: false, isError: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });
});
