import {ADD_HISTORY_ITEM, DELETE_HISTORY_ITEM, SET_HISTORY} from "../actionTypes"

const sorter = (a, b) => a.timestamp === b.timestamp ? 0 : a.timestamp < b.timestamp ? 1 : -1

const initialState = {
  items: []
}


const historyReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_HISTORY_ITEM:
      let history = [...state.items, action.payload]
      const query = JSON.stringify(action.payload.query)
      const item = state.items.find(item => JSON.stringify(item.query) === query && item.isError === action.payload.isError)
      if (item) {
        history = [...state.items]
        const index = state.items.indexOf(item)
        history[index].timestamp = action.payload.timestamp
        history[index].isError = action.payload.isError
      }
      return {
        ...state,
        items: history.sort(sorter).slice(0, 21)
      }

    case DELETE_HISTORY_ITEM:
      return {
        ...state,
        items: [...state.items.filter(item => item.id !== action.payload)].sort(sorter)
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