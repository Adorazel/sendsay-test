import {applyMiddleware, createStore} from "redux"
import reducer from "./reducers"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

const stringMiddleware = () => (dispatch) => (action) => {
  if (typeof action === "string") return dispatch({type: action})
  return dispatch(action)
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(stringMiddleware, thunk)))

export default store