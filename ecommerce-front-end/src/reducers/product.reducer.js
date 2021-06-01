import { productConstants } from "../actions/constants"

const initState = {
    products : [],
    productsByPrice : {
        under5K : [],
        under10K : [],
        under15K : [],
        under20K : [],
        under30K : [],
        above30K : []
    }
}

const allProductsReducer = (state = initState, action) => {
    
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products : action.payload.products,
                productsByPrice : {
                    ...action.payload.productsByPrice
                }
            }
            break;
        default :  {
            state = {
                ...state
            }
            break;
        }
    }

    return state;

}

export default allProductsReducer;