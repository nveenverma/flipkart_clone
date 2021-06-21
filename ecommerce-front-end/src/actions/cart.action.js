import { cartConstants } from "../actions/constants"
import store from "../store"

export const addToCart = (product, newQty=1) => {
    return async dispatch => {
        const { cartItems } = store.getState().cart;
        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQty) : 1;
        cartItems[product._id] = {
            ...product,
            qty
        }
        localStorage.setItem('cart', JSON.stringify(cartItems))

        dispatch({
            type : cartConstants.ADD_TO_CART,
            payload : { 
                cartItems 
            }
        })
    }

}

export const updateCart = () => {
    return async dispatch => {

        const cart = localStorage.getItem('cart') ? 
        JSON.parse(localStorage.getItem('cart')) : null

        if (cart) {
            dispatch({
                type : cartConstants.ADD_TO_CART,
                payload : { 
                    cartItems : cart
                }
            })
        }
    }

}