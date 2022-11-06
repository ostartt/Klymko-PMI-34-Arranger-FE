import {RatingTypes} from "./rating.types";

const INITIAL_STATE = {
    isFetching: false,
    logsList: [],
    errorMessage: null,
    page: 1,
    logsLength: 0

}

export const ratingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RatingTypes.START_LOAD_LIST:
            return {
                ...state,
                isFetching: true
            }
        case RatingTypes.SUCCESS_LOAD_LIST:
            return {
                ...state,
                isFetching: false,
                logsList: action.payload.logsDTOList,
                logsLength: action.payload.logsNumber,
                errorMessage: null
            }
        case RatingTypes.FAILURE_LOAD_LIST:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case RatingTypes.CHANGE_PAGE:
            return {
                ...state,
                page: action.payload,
            }
        default:
            return state
    }
}