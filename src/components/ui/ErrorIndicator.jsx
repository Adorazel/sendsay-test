import React from "react"

const ErrorIndicator = ({error = {}}) => {
  return <div className="alert alert-danger">
    <div className="h5 alert-heading mb-0">{error.message || "Что-то пошло не так..."}</div>
    <div className="description">{error.description}</div>
  </div>
}

export default ErrorIndicator