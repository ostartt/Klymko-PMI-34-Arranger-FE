import axios from 'axios'
import { AuthActionTypes } from './auth.types'

export const authRequestStart = () => ({
  type: AuthActionTypes.USER_AUTH_REQUEST_START,
})
export const authFailureReset = () => ({
  type: AuthActionTypes.USER_AUTH_FAILURE_RESET,
})

export const authRequestSuccess = (data) => ({
  type: AuthActionTypes.USER_AUTH_REQUEST_SUCCESS,
  payload: data,
})

export const authRequestFailure = (errorsObject) => ({
  type: AuthActionTypes.USER_AUTH_REQUEST_FAILURE,
  payload: errorsObject.message,
})

export function userSignUpRequest(userData) {
  return async (dispatch) => {
    let result = false
    dispatch(authRequestStart())
    await axios
        .post('http://localhost:8765/api/v1/sign-up', userData)
        .then((data) => {
          result = true
        })
        .catch((errorObject) => {
          console.log(errorObject)
          dispatch(authRequestFailure(errorObject.response.data))
          result = false
        })
    return result
  }
}

export function userSignInRequest(userData) {
  return async (dispatch) => {
    let result = true
    dispatch(authRequestStart())
    await axios
      .post('http://localhost:8765/login', userData)
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data.data))
        dispatch(authRequestSuccess(data.data))
      })
      .catch((errorObject) => {
        result = false
        dispatch(authRequestFailure(errorObject.response.data))
      })
    return result
  }
}

export const userLogout = () => ({
  type: AuthActionTypes.USER_AUTH_LOGOUT,
})

export const userLogoutRequest = () => (dispatch) => {
  dispatch(userLogout())
  localStorage.removeItem('user')
}

export const setCurrentUser = (user) => ({
  type: AuthActionTypes.SET_CURRENT_USER,
  payload: user,
})

