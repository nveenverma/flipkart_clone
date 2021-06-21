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
    }
};

 const cartReducer = (state = initState, action) => {
    switch(action.type) {
        case cartConstants.ADD_TO_CART:
            state = {
                ...state,
                cartItems : action.payload.cartItems
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