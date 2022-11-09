import {combineReducers} from "redux";
import {authReducer} from "./auth/auth.reducer";
import {ratingReducer} from "./rating/rating.reducer";
import {serverReducer} from "./server/server.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    rating: ratingReducer,
    server: serverReducer
})


export default rootReducer