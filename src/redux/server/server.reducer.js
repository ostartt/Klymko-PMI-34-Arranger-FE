import {ServerTypes} from "./server.types";

const INITIAL_STATE = {
    isFetching: false,
    serverList: [],
    errorMessage: null,

}

export const serverReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ServerTypes.START_LOAD_SERVERS:
            return {
                ...state,
                isFetching: true
            }
        case ServerTypes.SUCCESS_LOAD_SERVERS:
            return {
                ...state,
                isFetching: false,
                serverList: action.payload,
                errorMessage: null
            }
        case ServerTypes.FAILURE_LOAD_SERVERS:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}