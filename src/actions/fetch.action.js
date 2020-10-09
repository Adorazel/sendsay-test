import {SET_FETCH_ERROR, SET_FETCH_LOADING} from "../actionTypes"
import {setResponseBody, setResponseError} from "./"


const setLoading = () => SET_FETCH_LOADING

const setFetchSuccess = () => SET_FETCH_ERROR

const setFetchError = error => {
  return {
    type: SET_FETCH_ERROR,
    payload: error
  }
}

const send = sendsay => ({body, options}) => dispatch => {
  dispatch(setLoading())
  const req = sendsay.request(body, options)
  req.then(res => {
    dispatch(setFetchSuccess())
    try {
      const body = JSON.stringify(res, null, 2)
      dispatch(setResponseBody(body))
    } catch (e) {
      process.env.NODE_ENV === "development" && console.log(e)
    }
  }).catch(error => {
    dispatch(setFetchError(error))
    try {
      const body = JSON.stringify(error, null, 2)
      dispatch(setResponseBody(body))
      dispatch(setResponseError())
    } catch (e) {
      process.env.NODE_ENV === "development" && console.log(e)
    }
  })
}


export {
  send
}