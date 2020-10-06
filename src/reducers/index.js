import {combineReducers} from "redux"
import authReducer from "./auth.reducer"
import historyReducer from "./history.reducer"


export default combineReducers({
  auth: authReducer,
  history: historyReducer,

})