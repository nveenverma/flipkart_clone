import { userConstants } from "../actions/constants";

const initState = {
    error : null,
    message : null,
    loading : false,
    created : false
}

// Reducer which updates central store based on the action type dispatched
const userReducer = (state = initState, action) => {

    switch(action.type) {
        case userConstants.USER_REGISTER_REQUEST : 
            state = {
                ...state,
                loading : true,                
            }
            break;
        
        case  userConstants.USER_REGISTER_SUCCESS : 
            state = {
                ...state,
                loading : false,
                created : true,
                message : action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE : 
            state = {
                ...state,
                loading : false,
                created : false,
                error : action.payload.error
            }
            break;
        default :
        state = { ...state }
    }

    return state;

}

export default userReducer;