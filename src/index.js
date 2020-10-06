import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import "isomorphic-fetch"
import {App, ErrorBoundary} from "./components"
import {SendsayServiceProvider} from "./contexts"
import {Sendsay} from "./services"
import * as serviceWorker from "./serviceWorker"
import store from "./store"
import "./css/index.css"


const sendsay = new Sendsay()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <SendsayServiceProvider value={sendsay}>
          <App/>
        </SendsayServiceProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
