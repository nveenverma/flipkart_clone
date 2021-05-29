import axios from "../helpers/axios"

export const addProduct = form => {

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization' : token ? `Bearer ${token}` : null
    }
    
    return async dispatch => {
        const res = await axios.post('product/create', form, headers)
        console.log(res)
    }
}