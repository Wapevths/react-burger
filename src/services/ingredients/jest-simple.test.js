import reducer, {initialState} from './reducer';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    POST_ORDER_INGREDIENTS_REQUEST,
    POST_ORDER_INGREDIENTS_SUCCESS,
    POST_ORDER_INGREDIENTS_ERROR,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SORT_INGREDIENT,
    GET_SELECT_INGREDIENT,
} from './actions';

describe('User reducer', () => {

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        const action = { type: GET_INGREDIENTS_REQUEST };
        const expectedState = { ...initialState, isLoading: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const mockIngredients = [{ id: 1, name: 'Ingredient1' }, { id: 2, name: 'Ingredient2' }];
        const action = { type: GET_INGREDIENTS_SUCCESS, payload: mockIngredients };
        const expectedState = { ...initialState, ingredients: mockIngredients, isLoading: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_INGREDIENTS_ERROR', () => {
        const action = { type: GET_INGREDIENTS_ERROR };
        const expectedState = { ...initialState, isLoadingOrderIngredients: false, ingredients: [], errorOrderIngredients: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_ORDER_INGREDIENTS_REQUEST', () => {
        const action = { type: POST_ORDER_INGREDIENTS_REQUEST };
        const expectedState = { ...initialState, isLoadingOrderIngredients: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_ORDER_INGREDIENTS_SUCCESS', () => {
        const mockPayload = 'mockPayload';
        const action = { type: POST_ORDER_INGREDIENTS_SUCCESS, payload: mockPayload };
        const expectedState = { ...initialState, orderIngredients: mockPayload, constructorIngredients: [], isLoadingOrderIngredients: false };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle POST_ORDER_INGREDIENTS_ERROR', () => {
        const action = { type: POST_ORDER_INGREDIENTS_ERROR };
        const expectedState = { ...initialState, isLoadingOrderIngredients: false, orderIngredients: '', errorOrderIngredients: true };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_INGREDIENT', () => {
        const mockPayload = { uniqId: 123, type: 'bun', name: 'Burger Bun' };
        const action = { type: ADD_INGREDIENT, payload: mockPayload };
        const expectedState = { ...initialState, constructorIngredients: [mockPayload] };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SORT_INGREDIENT', () => {
        const mockPayload = [{ uniqId: 1, type: 'ingredient' }, { uniqId: 2, type: 'ingredient' }];
        const action = { type: SORT_INGREDIENT, payload: mockPayload };
        const expectedState = { ...initialState, constructorIngredients: mockPayload };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_SELECT_INGREDIENT', () => {
        const mockPayload = 'selectedIngredient';
        const action = { type: GET_SELECT_INGREDIENT, payload: mockPayload };
        const expectedState = { ...initialState, selectIngredient: mockPayload };
        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_INGREDIENT', () => {
        const initialStateWithIngredients = { ...initialState, constructorIngredients: [{ uniqId: 1 }, { uniqId: 2 }] };
        const action = { type: DELETE_INGREDIENT, payload: 1 };
        const expectedState = { ...initialState, constructorIngredients: [{ uniqId: 2 }] };
        expect(reducer(initialStateWithIngredients, action)).toEqual(expectedState);
    });
});
