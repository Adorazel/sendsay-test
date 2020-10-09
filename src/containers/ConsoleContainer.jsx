import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {setRequestBody, setResponseBody} from "../actions"
import {Console} from "../components"


class ConsoleContainer extends Component {

  changeHandler = event => {
    const {setRequestBody} = this.props
    setRequestBody(event.target.value)
  }

  render() {
    const {changeHandler} = this
    const {request, response, isLoading} = this.props
    const consoleProps = {request, response, changeHandler, isLoading}
    return <Console {...consoleProps}/>
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

const mapDispatchToProps = dispatch => bindActionCreators({setRequestBody, setResponseBody}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleContainer)
