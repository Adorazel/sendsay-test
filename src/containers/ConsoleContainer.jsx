import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {compose} from "../utils"
import {withSendsay} from "../hoc"
import {send, setRequestBody, setRequestError, setResponseBody} from "../actions"
import {Console, Footer} from "../components"


class ConsoleContainer extends Component {

  changeHandler = event => {
    const {setRequestBody} = this.props
    setRequestBody(event.target.value)
  }

  doFormat = () => {
    const {request, setRequestBody, setRequestError} = this.props
    try {
      let value = JSON.parse(request.value)
      value = JSON.stringify(value, null, 2)
      setRequestBody(value)
      return true
    } catch (e) {
      setRequestError()
    }
    return false
  }

  doSend = () => {
    const {send, request, setResponseBody} = this.props
    setResponseBody("")
    if (this.doFormat()) {
      const body = JSON.parse(request.value)
      send({body})
    }
  }

  keydownListener = event => {
    if (event.key === "Enter") {
      event.preventDefault()
      this.doSend()
    }
    if (event.key === "f" && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
      event.preventDefault()
      this.doFormat()
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownListener)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownListener)
  }

  render() {
    const {changeHandler, doSend, doFormat} = this
    const {request, response, isLoading} = this.props
    const consoleProps = {request, response, changeHandler, isLoading}
    const footerProps = {doSend, doFormat, isLoading}
    return <>
      <Console {...consoleProps}/>
      <Footer {...footerProps}/>
    </>
  }
}

const mapStateToProps =
  ({
     request: {body: requestBody, error: requestError},
     response: {body: responseBody, error: responseError},
     fetch: {isLoading}
   }) => ({
    request: {value: requestBody, isValid: !requestError},
    response: {value: responseBody, isValid: !responseError},
    isLoading
  })

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  setRequestBody,
  setRequestError,
  setResponseBody,
  send: send(sendsayService),

}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(ConsoleContainer)
