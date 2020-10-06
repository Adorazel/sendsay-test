import React from "react"
import {Button, Dropdown} from "../ui"

const Console = props => {

  const {logoutHandler, isLoading} = props

  return <div className="console">
    <Button onClick={logoutHandler} loading={isLoading}>Выйти</Button>
    <br/>
    <br/>
    <Dropdown className="ml-5">
      <Dropdown.Toggle>
        <span className="request-dot request-dot-success"/>
        pong
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => console.log("Выполнить")}>Выполнить</Dropdown.Item>
        <Dropdown.Item onClick={() => console.log("Скопировать")}>Скопировать</Dropdown.Item>
        <div className="dropdown-divider"/>
        <Dropdown.Item variant="danger" onClick={() => console.log("Удалить")}>Удалить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
}

export default Console