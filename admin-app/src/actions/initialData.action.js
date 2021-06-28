import axios from "../helpers/axios"
import { categoryConstants, orderConstants, pageConstants, productConstants } from "./constants"

export const getInitialData = () => {
    return async dispatch => {

        const res = await axios.get('/initialData');
        if (res.status === 200) {

            const { categories, products, orders, pages } = res.data;

            dispatch({
                type : categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload : { categories }
            });

            dispatch ({
                type : productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload : { products }
            });
            
            dispatch ({
                type : orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload : { orders }
            });

            dispatch ({
                type : pageConstants.GET_ALL_PAGES_SUCCESS,
                payload : { pages }
            });

        } 

    }
}