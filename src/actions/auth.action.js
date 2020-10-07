import {SET_AUTH_ERROR, SET_AUTH_LOADING, SET_AUTH_STATUS, SET_AUTH_USER} from "../actionTypes"

const setLoading = auth => {
  return {
    type: SET_AUTH_LOADING,
    payload: auth
  }
}

const setAuth = auth => {
  return {
    type: SET_AUTH_STATUS,
    payload: auth
  }
}

const setError = error => {
  return {
    type: SET_AUTH_ERROR,
    payload: error
  }
}

const setUser = ({login, sublogin}) => {
  return {
    type: SET_AUTH_USER,
    payload: {login, sublogin}
  }
}


const signIn = sendsay => ({login, sublogin, password}) => dispatch => {
  dispatch(setLoading(true))
  sendsay
    .login({login, sublogin, password})
    .then(() => {
      document.cookie = `sendsay_session=${sendsay.session}; max-age=3600`
      dispatch(setUser({login, sublogin}))
      dispatch(setAuth(true))
      dispatch(setError(null))
      dispatch(setLoading(false))
    })
    .catch(error => {
      dispatch(setError(error))
      dispatch(setLoading(false))
    })
}

const logout = sendsay => () => dispatch => {
  dispatch(setLoading(true))
  sendsay
    .performRequest({action: "logout"})
    .then(response => {
      process.env.NODE_ENV === "development" && console.log(response)
      document.cookie = `sendsay_session=; max-age=-1`
      dispatch(setUser({login: null, sublogin: null}))
      dispatch(setAuth(false))
      dispatch(setError(null))
      dispatch(setLoading(false))
    })
    .catch(error => {
      dispatch(setError(error))
      dispatch(setLoading(false))
    })
}


export {
  setAuth,
  signIn,
  logout,
  setError,
  setUser
}