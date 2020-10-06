import autosort from "array-autosort"
import compose from "./compose"

// const sorter = (a, b) => a.timestamp === b.timestamp ? 0 : a.timestamp < b.timestamp ? -1 : 1
// const actual = autosort([
//   { timestamp:1 },
//   { timestamp:20 },
//   { timestamp:8 },
//   { timestamp:15 },
// ], sorter)

export {
  autosort,
  compose
}