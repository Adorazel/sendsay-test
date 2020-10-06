import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {logout} from "../actions"
import {compose} from "../utils"
import {withSendsay} from "../hoc"
import {Console} from "../components"


class ConsoleContainer extends Component {

  logoutHandler = () => {
    const {logout} = this.props
    logout()
  }

  render() {
    const {logoutHandler} = this
    const {isLoading} = this.props
    const consoleProps = {logoutHandler, isLoading}
    return <Console {...consoleProps}/>
  }
}

const mapStateToProps = ({auth: {isLoading}}) => ({isLoading})

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  logout: logout(sendsayService),
}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(ConsoleContainer)
