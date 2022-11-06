import {RatingTypes} from './rating.types'
import axios from 'axios'

export const startLoadLogsList = () => ({
    type: RatingTypes.START_LOAD_LIST,
})
export const successLoadLogsList = (userLogs) => ({
    type: RatingTypes.SUCCESS_LOAD_LIST,
    payload: userLogs,
})
export const failureLoadLogsList = (error) => ({
    type: RatingTypes.FAILURE_LOAD_LIST,
    payload: error,
})

export const requestLogsList =
    () => (dispatch, getState) => {
        dispatch(startLoadLogsList())
        const PAGE_AMOUNT = 2;
        axios
            .get(
                `http://localhost:8765/api/v1/logs/${getState().auth.userObject.id}/users?page=${getState().rating.page - 1}&amount=${PAGE_AMOUNT}`, {
                    headers: {authorization: getState().auth.userObject.jwt}
                }
            )
            .then((res) => {
                dispatch(
                    successLoadLogsList(res.data)
                )
            })
            .catch((error) => dispatch(failureLoadLogsList(error)))
    }

export const changePage = (page) => ({
    type: RatingTypes.CHANGE_PAGE,
    payload: page,
})
