import {
    GET_DETAILED_ORDER_ERROR,
    GET_DETAILED_ORDER_REQUEST,
    GET_DETAILED_ORDER_SUCCESS
} from './actions'

const initialState:any = {
    isLoading: false,
    isError: false,
    order: []

}


export default (state = initialState, action:any) => {
    switch (action.type) {
        case GET_DETAILED_ORDER_REQUEST:
            return {...state, order: [], isLoading: true, isError: false}
        case GET_DETAILED_ORDER_SUCCESS:
            return {...state, order: action.payload, isLoading: false, isError: false}
        case GET_DETAILED_ORDER_ERROR:
            return {...state, order: [], isLoading: false, isError: true}
        default:
            return state
    }
}