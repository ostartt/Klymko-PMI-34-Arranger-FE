import {ServerTypes} from './server.types'
import axios from 'axios'

export const startLoadLogsList = () => ({
    type: ServerTypes.START_LOAD_SERVERS,
})
export const successLoadLogsList = (servers) => ({
    type: ServerTypes.SUCCESS_LOAD_SERVERS,
    payload: servers,
})
export const failureLoadLogsList = (error) => ({
    type: ServerTypes.FAILURE_LOAD_SERVERS,
    payload: error,
})

export const requestServerList =
    () => (dispatch, getState) => {
        dispatch(startLoadLogsList())

        axios
            .get(
                'http://localhost:8765/api/v1/admin/servers', {
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


