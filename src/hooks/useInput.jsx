import {useState} from "react"

const noop = () => {
}

const useInput = (initialState, cb = noop, match) => {

  const [value, setValue] = useState(initialState)

  const onChange = event => {
    setValue(event.target.value)
    cb()
  }

  let isValid = true

  if (match) {
    isValid = match.test(value.trim())
  }

  return {
    bind: {value, onChange},
    value,
    isValid
  }
}

export default useInput