import {ADD_HISTORY_ITEM, DELETE_HISTORY_ITEM, SET_HISTORY} from "../actionTypes"
import {autosort} from "../utils"

const sorter = (a, b) => a.timestamp === b.timestamp ? 0 : a.timestamp < b.timestamp ? 1 : -1

const initialState = {
  items: []
}


const historyReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_HISTORY_ITEM:
      return {
        ...state,
        items: autosort([...state.items, action.payload], sorter).slice(0, 21)
      }

    case DELETE_HISTORY_ITEM:
      return {
        ...state,
        items: autosort(state.items.filter(item => item.id !== action.payload), sorter)
      }

    case SET_HISTORY:
      return {
        ...state,
        items: action.payload
      }

    default:
      return state
  }
}

export default historyReducer