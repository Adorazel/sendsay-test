import {SET_RESPONSE_BODY, SET_RESPONSE_ERROR} from "../actionTypes"

const setResponseBody = body => {
  return {
    type: SET_RESPONSE_BODY,
    payload: body
  }
}

const setResponseError = () => SET_RESPONSE_ERROR

export {
  setResponseBody,
  setResponseError,
}