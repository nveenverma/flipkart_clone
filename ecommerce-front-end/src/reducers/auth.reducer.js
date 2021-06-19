import { authConstants } from "../actions/constants";

// Initial State saved in the central store
const initialState = {
    token : null,
    user : {
        firstName : '',
        lastName : '',
        email : '',
        picture : ''
    },
    authenticate : false,
    authenticating : false,
    loading : false,
    error : null,
    message : ''
};

// Reducer which updates central store based on the action type dispatched
const authReducer = (state = initialState, action) => {

    console.log(action);
    
    switch (action.type) {

        // Changing state if login request action type
        case authConstants.LOGIN_REQUEST : 
            state = {               
                ...state,
                authenticating : true
            }
            break;

        // Changing state if login success action type
        case authConstants.LOGIN_SUCCESS : 
            state = {               
                ...state,
                user : action.payload.user,
                token : action.payload.token,
                authenticating : false,
                authenticate : true
            }
            break;

        // Changing state if login Failure action type
        case authConstants.LOGIN_FAILURE : 
            state = {               
                ...state,
                error : action.payload.error,
                authenticating : false,
                authenticate : false
            }
            break;

        // Changing state if logout Request action type
        case authConstants.LOGOUT_REQUEST : 
            state = {               
                ...state,
                loading : true
            }
            break;

        // Changing state if logout Success action type
        case authConstants.LOGOUT_SUCCESS : 
            state = {               
                ...initialState,
                loading : false,
                authenticate : false
            }
            break;
            
        // Changing state if logout Failure action type
        case authConstants.LOGOUT_FAILURE : 
            state = {               
                ...state,
                loading : false,
                error : action.payload.error
            }
            break;            
        

        // Keep the state as it is for any default action type
        default :
            state = { ...state }
    }
    
    return state;

};

export default authReducer;