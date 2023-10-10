import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_ERROR,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
} from './actions'

const initialState = {
    ingredients: [],
    selectedIngredients: [],
    isLoading: false,
    error: false,
    constructorIngredients: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {...state, isLoading: true}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredients: action.payload, isLoading: false}
        }
        case GET_INGREDIENTS_ERROR: {
            return {...state, isLoading: false, ingredients: [], error: true}
        }
        case ADD_INGREDIENT: {
            return {...state, constructorIngredients: [...state.constructorIngredients, action.payload]}
        }

        case DELETE_INGREDIENT: {
            const newConstructorState = state.constructorIngredients.filter(({uniqId}) => uniqId !== action.payload )
            return {...state, constructorIngredients: newConstructorState}
        }
        default:
            return state
    }
}