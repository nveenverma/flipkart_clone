import { authConstants } from "../actions/constants";

const initialState = {
    name : "Navn"
};

const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case authConstants.LOGIN_REQUEST : 
            state = {               
                ...state,
                ...action.payload
            }
            break;

        default :
            state = { "test" : "123" }
    }
    
    return state;

};

export default authReducer;