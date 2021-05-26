import authReducer from "./auth.reducer"
import userReducer from "./user.reducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    auth : authReducer,
    userReducer : userReducer
});

export default rootReducer;