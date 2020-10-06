import React from "react"
import {Button, Dropdown, ErrorIndicator} from "../components/ui"

const ConsolePage = () => {
  return <div className="container">
    <h1>Test</h1>
    <a href="/sdsd" className="btn btn-primary">LOrem Ipsum</a>
    <br/>
    <br/>
    <Dropdown className="ml-5">
      <Dropdown.Toggle>
        <span className="request-dot request-dot-success"/>
        pong
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=> console.log("Выполнить")}>Выполнить</Dropdown.Item>
        <Dropdown.Item onClick={()=> console.log("Скопировать")}>Скопировать</Dropdown.Item>
        <div className="dropdown-divider"/>
        <Dropdown.Item variant="danger" onClick={()=> console.log("Удалить")}>Удалить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <br/>
    <br/>
    <Button>Войти</Button>
    <br/>
    <br/>
    <Dropdown className="ml-5">
      <Dropdown.Toggle>
        <span className="request-dot request-dot-success"/>
        pong
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=> console.log("Выполнить")}>Выполнить</Dropdown.Item>
        <Dropdown.Item onClick={()=> console.log("Скопировать")}>Скопировать</Dropdown.Item>
        <div className="dropdown-divider"/>
        <Dropdown.Item variant="danger" onClick={()=> console.log("Удалить")}>Удалить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <br/>
    <br/>
    <ErrorIndicator/>
  </div>
}

export default ConsolePage