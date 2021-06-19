import axios from "../helpers/axios"
import { productConstants } from "./constants";

// Action Creator for getting products by page
export const getProductsBySlug = (slug) => {
    return async dispatch => {
        
        const res = await axios.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type : productConstants.GET_PRODUCTS_BY_SLUG,
                payload : res.data 
            })
            console.log(res.data)
        } else {
            console.log("error occured")
        }
        
    }
}

// Action Creator for getting products by page
export const getProductPage = (payload) => {
    return async dispatch => {

        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            
            dispatch({ type : productConstants.GET_PRODUCT_PAGE_REQUEST })
            
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type : productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload : { page } 
                })
            } else {
                const { error } = res.data;
                dispatch({
                    type : productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload : { error } 
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

