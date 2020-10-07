import React, {useEffect} from "react"
import {connect} from "react-redux"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {LoginPage, ConsolePage} from "../pages"
import withSendsay from "../hoc/withSendsay"
import {setAuth} from "../actions"
import {compose} from "../utils"


const App = ({sendsayService, isAuth, setAuth}) => {

  useEffect(() => {
    sendsayService.setSessionFromCookie("sendsay_session")
    const isAuth = sendsayService.getUsername() !== "unauthorized"
    setAuth(isAuth)
  }, [sendsayService, setAuth])

  return <Router>
    <Switch>
      <Route exact path="/">{isAuth ? <ConsolePage/> : <Redirect to="/login"/>}</Route>
      <Route exact path="/login">{!isAuth ? <LoginPage/> : <Redirect to="/"/>}</Route>
      <Route><Redirect to="/"/></Route>
    </Switch>
  </Router>
}

const mapStateToProps = ({auth: {isAuth}}) => ({isAuth})

const mapDispatchToProps = {setAuth}

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(App)

