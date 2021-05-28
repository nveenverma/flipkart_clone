import axios from "../helpers/axios"
import { userConstants } from "./constants"

// Signup Action Creater
export const signup = (user) => {

    // console.log(user);

    // Below code is run in sequence dispatching several actions when user is trying to log in
    return async (dispatch) => {

        // First dispatch -> Login Request
        dispatch({ type : userConstants.USER_REGISTER_REQUEST });
        const res = await axios.post('/admin/signup', {
            ...user
        });

        // If the response status is ok, dispatch -> Login Success
        if (res.status === 201) {
            const { message } = res.data;
            dispatch({ 
                type : userConstants.USER_REGISTER_SUCCESS,
                payload : {
                    message
                }
            });

        // If the response status is an error, dispatch -> Login Failure
        } else {
            if (res.status === 400) {
                dispatch ({
                    type : userConstants.USER_REGISTER_FAILURE,
                    payload : { error : res.data.error }
                })
            }
        }

    }
}