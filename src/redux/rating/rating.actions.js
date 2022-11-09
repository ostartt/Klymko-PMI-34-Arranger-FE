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
        const PAGE_AMOUNT = 6;
        axios
            .get(
                `http://localhost:8765/api/v1/logs/users?page=${getState().rating.page - 1}&amount=${PAGE_AMOUNT}`, {
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

export const cancelTask =
    (logId) => (dispatch, getState) => {
    dispatch(cancelTaskItem(getState().rating.logsList.filter(item => item.id === logId)[0]))
        axios
            .put(
                `http://localhost:8765/api/v1/permutations/${logId}`, {},{
                    headers: {authorization: getState().auth.userObject.jwt}
                }
            )
            .then((res) => {
                const cancelledTasks = JSON.parse(localStorage.getItem("cancelledTasks")) ?
                    JSON.parse(localStorage.getItem("cancelledTasks")) : []

                localStorage.setItem("cancelledTasks", JSON.stringify(cancelledTasks.filter(item => item.id !== logId)))
            })
            .catch((error) => console.log(error))
    }

export const cancelTaskItem = (item) => ({
    type: RatingTypes.CANCEL_STATUS,
    payload: item,
})


export const addTask =
    (string) => (dispatch, getState) => {
        axios
            .post(
                `http://localhost:8765/api/v1/permutations`, {givenString:string},{
                    headers: {authorization: getState().auth.userObject.jwt}
                }
            )
            .then((res) => {
            })
            .catch((error) => console.log(error))
    }

export const changePage = (page) => ({
    type: RatingTypes.CHANGE_PAGE,
    payload: page,
})
