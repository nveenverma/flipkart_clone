import axios from "../helpers/axios"
import { authConstants } from "./constants"

// Login Action Creater
export const login = (user) => {

    console.log(user);

    // Below code is run in sequence dispatching several actions when user is trying to log in
    return async (dispatch) => {

        // First dispatch -> Login Request
        dispatch({ type : authConstants.LOGIN_REQUEST });
        const res = await axios.post('/admin/signin', {
            ...user
        });

        // If the response status is ok, dispatch -> Login Success
        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ 
                type : authConstants.LOGIN_SUCCESS,
                payload : {
                    token, user
                }
            });

        // If the response status is an error, dispatch -> Login Failure
        } else {
            if (res.status === 400) {
                dispatch ({
                    type : authConstants.LOGIN_FAILURE,
                    payload : { error : res.data.error }
                })
            }
        }

    }
}


// Action Creater which dispatches actions based on if the user is logged in or not
export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = localStorage.getItem('user')
            dispatch({ 
                type : authConstants.LOGIN_SUCCESS,
                payload : {
                    token, user
                }
            });
        } else {
            dispatch ({
                type : authConstants.LOGIN_FAILURE,
                payload : { error : 'Failed to log in' }
            })
        }
    }
}


// Action Creater which dispatches actions based on if the user is logged in or not
export const signout = () => {
    return async dispatch => {
        localStorage.clear();

        dispatch({ type : authConstants.LOGOUT_REQUEST });
    }
}