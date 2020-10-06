import React, {Component} from "react"
import {ErrorIndicator} from "./ui"

export default class ErrorBoundary extends Component {

  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo
    })
  }

  render() {
    const {hasError, error, errorInfo} = this.state
    if (hasError) return <div className="container"><div className="p-5">
      <ErrorIndicator error={{message: error, description: errorInfo}}/>
    </div></div>
    return this.props.children
  }
}