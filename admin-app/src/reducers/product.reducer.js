import { productConstants } from "../actions/constants"

const initState = {
    products : [],
    loading : false,
    error : null
}

const productReducer = (state=initState, action) => {

    switch(action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS : 
            state = {
                ...state,
                products : action.payload.products
            }
            break;

        default :
            state = {
                ...state
            }
            break;
    }

    return state;
}

export default productReducer;