import React from "react"
import {Button, ErrorIndicator} from "./ui"
import {useInput} from "../hooks"
import logo from "../img/logo.png"
import logo_2x from "../img/logo@2x.png"


const Login = props => {

  const {error, isLoading, loginHandler, clearError} = props

  const login = useInput("adorazel@gmail.com", clearError, /^(?:[A-Z\d][A-Z\d_]{5,20}|[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,6})$/i)
  const sublogin = useInput("", clearError)
  const password = useInput("mi6Fieque", clearError, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\s\da-zA-Z]{8,}$/)

  let errorIndicatorSettings = null

  if (error) {
    errorIndicatorSettings = {
      message: error.explain === "wrong_credentials" && "Вход не вышел",
      description: JSON.stringify(error, ["id", "explain"], 1)
    }
  }

  const valid = login.isValid && password.isValid

  return <div className="login d-flex flex-column justify-content-center align-items-center">
    <div className="mb-4">
      <img src={logo} srcSet={`${logo} 1x, ${logo_2x} 2x`} alt="API-консолька"/>
    </div>
    <div className="login-form">
      <h1 className="h4">API-консолька</h1>
      {errorIndicatorSettings && <ErrorIndicator error={errorIndicatorSettings}/>}
      <div className={`mb-3${login.isValid ? "" : " error"}`}>
        <label htmlFor="login">Логин</label>
        <input type="text" id="login" className="form-control" name="login" {...login.bind} disabled={isLoading}/>
      </div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-end">
          <label htmlFor="sublogin">Сублогин</label>
          <span className="optional">Опционально</span>
        </div>
        <input type="text" id="sublogin" className="form-control" name="sublogin" {...sublogin.bind}
               disabled={isLoading}/>
      </div>
      <div className={`mb-3${password.isValid ? "" : " error"}`}>
        <label htmlFor="password">Пароль</label>
        <input type="password" id="password" className="form-control" name="password" {...password.bind}
               disabled={isLoading}/>
      </div>

      <Button onClick={() => loginHandler({
        login: login.value.trim(),
        sublogin: sublogin.value.trim(),
        password: password.value.trim()
      })} loading={isLoading} disabled={!valid}>
        Войти
      </Button>
    </div>
  </div>
}

export default Login