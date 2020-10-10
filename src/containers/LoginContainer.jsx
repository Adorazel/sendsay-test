import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {setAuthError, signIn} from "../actions"
import {compose} from "../utils"
import {withSendsay} from "../hoc"
import {Login} from "../components"


class LoginContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      login: {value: "", isValid: true},
      sublogin: {value: "", isValid: true},
      password: {value: "", isValid: true},
      isFormValid: true
    }
  }

  clearError = () => {
    const {setAuthError} = this.props
    setAuthError(null)
  }

  changeHandler = event => {

    this.clearError()
    const {name, value} = event.target
    let isValid = true

    this.setState(state => {

      let isFormValid = state.isFormValid

      if (name === "login") {
        isValid = /^(?:[A-Z\d][A-Z\d_]{5,20}|[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,6})$/i.test(value.trim())
        isFormValid = state.password.isValid && isValid
      }

      if (name === "password") {
        isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\s\da-zA-Z]{8,}$/.test(value.trim())
        isFormValid = state.login.isValid && isValid
      }

      return {
        ...state,
        [name]: {value, isValid},
        isFormValid
      }
    })
  }

  loginHandler = () => {
    const {signIn} = this.props
    const {login, sublogin, password, isFormValid} = this.state
    if (isFormValid) signIn({
      login: login.value.trim(),
      sublogin: sublogin.value.trim(),
      password: password.value.trim()
    })
  }

  keydownHandler = event => {
    if (event.key === "Enter") this.loginHandler()
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisState = this.state
    const thisProps = this.props
    switch (true) {
      case thisProps.error !== nextProps.error: return true
      case thisProps.isLoading !== nextProps.isLoading: return true
      case thisState.isFormValid !== nextState.isFormValid: return true
      case thisState.login.value !== nextState.login.value: return true
      case thisState.sublogin.value !== nextState.sublogin.value: return true
      case thisState.password.value !== nextState.password.value: return true
      case thisState.login.isValid !== nextState.login.isValid: return true
      case thisState.sublogin.isValid !== nextState.sublogin.isValid: return true
      case thisState.password.isValid !== nextState.password.isValid: return true
      default: return false
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler)
  }

  render() {
    const {isLoading, error} = this.props
    let alertProps = null
    if (error) alertProps = {
      message: error.explain === "wrong_credentials" && "Вход не вышел",
      description: JSON.stringify(error, ["id", "explain"], 1)
    }
    const {loginHandler, changeHandler} = this
    const {login, sublogin, password, isFormValid} = this.state
    const loginProps = {loginHandler, changeHandler, isLoading, alertProps, login, sublogin, password, isFormValid}
    return <Login {...loginProps}/>
  }
}

const mapStateToProps = ({auth: {error, isLoading}}) => ({error, isLoading})

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  signIn: signIn(sendsayService),
  setAuthError
}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer)