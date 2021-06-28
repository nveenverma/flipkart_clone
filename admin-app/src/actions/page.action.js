import axios from "../helpers/axios"
import { pageConstants } from "./constants"

export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type : pageConstants.CREATE_PAGE_REQUEST })
        try {
            const res = await axios.post('/page/create', form);
            console.log(res)
            if (res.status === 201) {
                dispatch({ 
                    type : pageConstants.CREATE_PAGE_SUCCESS,
                    payload : { page : res.data.page }
                })                
            } else {
                dispatch({ 
                    type : pageConstants.CREATE_PAGE_FAILURE,
                    payload : { error : res.data.error }
                })                
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// new action
export const getPages = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: pageConstants.GET_ALL_PAGES_REQUEST });
        const res = await axios.get(`pages`);
        if (res.status === 200) {
          const { pages } = res.data;
          dispatch({
            type: pageConstants.GET_ALL_PAGES_SUCCESS,
            payload: { pages },
          });
        } else {
          dispatch({ type: pageConstants.GET_ALL_PAGES_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };