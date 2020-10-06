import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {setError, signIn} from "../actions"
import {compose} from "../utils"
import withSendsay from "../hoc/withSendsay"
import {Login} from "../components"



class LoginContainer extends Component {

  loginHandler = ({login, sublogin, password}) => {
    const {signIn} = this.props
    signIn({login, sublogin, password})
  }

  clearError = () => {
    const {setError} = this.props
    setError(null)
  }

  // logoutHandler = () => {
  //   const {logout} = this.props
  //   logout()
  // }

  render() {

    const {error, isLoading} = this.props
    const {loginHandler, clearError} = this
    const loginProps = {error, isLoading, loginHandler, clearError}

    return <Login {...loginProps}/>
  }

}


const mapStateToProps = ({auth: {error, isLoading}}) => ({error, isLoading})

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  signIn: signIn(sendsayService),
  setError
  // logout: logout(sendsayService)
}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer)