import {ADD_HISTORY_ITEM, DELETE_HISTORY_ITEM, SET_HISTORY} from "../actionTypes"


const addHistoryItem = item => {
  return {
    type: ADD_HISTORY_ITEM,
    payload: item
  }
}

const deleteHistoryItem = item => {
  return {
    type: DELETE_HISTORY_ITEM,
    payload: item
  }
}

const purgeHistory = () => {
  return {
    type: SET_HISTORY,
    payload: []
  }
}

export {
  addHistoryItem,
  deleteHistoryItem,
  purgeHistory
}