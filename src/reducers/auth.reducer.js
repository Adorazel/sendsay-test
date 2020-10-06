import {SET_AUTH_ERROR, SET_AUTH_LOADING, SET_AUTH_STATUS} from "../actionTypes"

const initialState = {
  isAuth: false,
  isLoading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case SET_AUTH_STATUS:
      return {
        ...state,
        isAuth: action.payload
      }

    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default authReducer