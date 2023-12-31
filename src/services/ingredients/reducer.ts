import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_ERROR,
    POST_ORDER_INGREDIENTS_REQUEST,
    POST_ORDER_INGREDIENTS_SUCCESS,
    POST_ORDER_INGREDIENTS_ERROR,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SORT_INGREDIENT,
    GET_SELECT_INGREDIENT, TTypesAction,
} from './actions'
import {ITypesIngredient} from "../../utils/types-ingredient";

interface IMyState {
    ingredients: ITypesIngredient[];
    selectedIngredients: ITypesIngredient[];
    isLoading: boolean;
    error: boolean;
    selectIngredient: string;
    constructorIngredients: ITypesIngredient[];
    orderIngredients: string;
    isLoadingOrderIngredients: boolean;
    errorOrderIngredients: boolean;
}

export const initialState:IMyState = {
    ingredients: [],
    selectedIngredients: [],
    isLoading: false,
    error: false,
    selectIngredient: '',
    constructorIngredients: [],
    orderIngredients: '',
    isLoadingOrderIngredients: false,
    errorOrderIngredients: false,
}


export default (state = initialState, action: TTypesAction) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {...state, isLoading: true}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredients: action.payload, isLoading: false}
        }

        case GET_INGREDIENTS_ERROR: {
            return {...state, isLoadingOrderIngredients: false, ingredients: [], errorOrderIngredients: true}
        }

        case POST_ORDER_INGREDIENTS_REQUEST: {
            return {...state, isLoadingOrderIngredients: true}
        }
        case POST_ORDER_INGREDIENTS_SUCCESS: {
            return {...state, orderIngredients: action.payload, constructorIngredients: [], isLoadingOrderIngredients : false}
        }
        case POST_ORDER_INGREDIENTS_ERROR: {
            return {...state, isLoadingOrderIngredients: false, orderIngredients: '', errorOrderIngredients: true}
        }
        case ADD_INGREDIENT: {
            let bun = [...state.constructorIngredients]
            let newArray = [...state.constructorIngredients, action.payload]
            for (let i = 0; i < bun.length; i++) {
                if (bun[i].type === action.payload.type && action.payload.type === 'bun') {
                    bun[i] = action.payload
                    newArray.splice(i, 1)
                    break
                }
            }
            return {...state, constructorIngredients: newArray}
        }

        case SORT_INGREDIENT: {
            return {...state, constructorIngredients: action.payload}
        }

        case GET_SELECT_INGREDIENT: {
            return {...state, selectIngredient: action.payload}
        }

        case DELETE_INGREDIENT: {
            const newConstructorState = state.constructorIngredients.filter(({uniqId}:any
            ) => uniqId !== action.payload)
            return {...state, constructorIngredients: newConstructorState}
        }
        default:
            return state
    }
}
