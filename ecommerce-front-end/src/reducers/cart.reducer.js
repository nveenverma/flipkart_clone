import { cartConstants } from "../actions/constants"

const initState = {
    cartItems : {
        // 123 : {
        //     _id : 123,
        //     name : 'Samsung Mobile',
        //     img : 'some.jpg',
        //     price : 200,
        //     qty : 1
        // }
    },
    updating : false,
    error : null
};

 const cartReducer = (state = initState, action) => {
    switch(action.type) {
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updating : true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems : action.payload.cartItems,
                updating : false
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                error : action.payload.error,
                updating : false
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initState,
            }
            break;
        default:
            state = {
                ...state
            }
    }
    return state;
}

export default cartReducer;