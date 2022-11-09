import {RatingTypes} from "./rating.types";

const INITIAL_STATE = {
    isFetching: false,
    logsList: [],
    errorMessage: null,
    page: 1,
    logsLength: 0,
    cancelledTasks: []
}


export const ratingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RatingTypes.START_LOAD_LIST:
            return {
                ...state,
                isFetching: true
            }
        case RatingTypes.SUCCESS_LOAD_LIST:
            const cancelledTasks = JSON.parse(localStorage.getItem("cancelledTasks")) ?
                JSON.parse(localStorage.getItem("cancelledTasks")) : []
            console.log(action.payload)
            return {
                ...state,
                isFetching: false,
                logsList: action.payload.logsDTOList.map(item => {
                    const cancelledElement = cancelledTasks.find(elem => elem.id === item.id)
                    if(cancelledElement){
                        return cancelledElement
                    }
                    return item
                }),
                logsLength: action.payload.logsNumber,
                errorMessage: null,
                cancelledTasks: cancelledTasks
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
        case RatingTypes.CANCEL:
            return {
                ...state,
                cancelledTasks: action.payload
            }
        case RatingTypes.CANCEL_STATUS:
            localStorage.setItem("cancelledTasks", JSON.stringify([... state.cancelledTasks, {... action.payload,
                permutationStatus: "INTERRUPTED"}]))
            return {
                ...state,
                cancelledTasks: [... state.cancelledTasks, action.payload],
                logsList: state.logsList.map(item => {
                    if(item.id === action.payload.id) {
                        return {...item, permutationStatus: "INTERRUPTED"}
                    }
                    return item
                })
            }
        default:
            return state
    }
}