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

        dispatch({ type : productConstants.GET_PRODUCT_PAGE_REQUEST })

        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
                
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

// Action Creator for getting a single products' details
export const getProductDetailsById = (payload) => {
    return async dispatch => {

        dispatch({ type : productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST })
        let res;

        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            
            console.log(res)
            dispatch({
                type : productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload : { productDetails : res.data.product } 
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type : productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload : { error : res.data.error }
            })
        }
    }
}

