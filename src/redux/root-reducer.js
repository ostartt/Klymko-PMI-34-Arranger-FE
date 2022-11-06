import {combineReducers} from "redux";
import {authReducer} from "./auth/auth.reducer";
import {ratingReducer} from "./rating/rating.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    rating: ratingReducer
})


export default rootReducer