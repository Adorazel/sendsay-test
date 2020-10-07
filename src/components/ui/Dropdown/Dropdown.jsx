import React, {Component, Children, cloneElement} from "react"
import Item from "./Item"
import Menu from "./Menu"
import Toggle from "./Toggle"


export default class Dropdown extends Component {

  static Toggle = Toggle
  static Menu = Menu
  static Item = Item

  constructor(props) {
    super(props)

    this.state = {
      trigger: React.createRef(),
      menu: React.createRef(),
      isOpened: false,
      position: {x: "", y: ""}
    }
  }

  setPosition = () => {
    this.setState(state => {
      let x, y
      x = y = ""
      if (state.isOpened) {
        const $menu = state.menu.current
        const $trigger = state.trigger.current
        const {right, bottom} = $trigger.getBoundingClientRect()
        $menu.style.minWidth = $trigger.offsetWidth + "px"
        x = right - $menu.offsetWidth
        y = bottom + 1
      }
      return {
        ...state,
        position: {x, y}
      }
    })
  }

  open = () => {
    this.setState(state => ({
      ...state,
      isOpened: true,
    }), () => {
      this.setPosition()
      document.addEventListener("click", this.close)
      document.addEventListener("keydown", this.close)
      document.addEventListener("closeAllDropdowns", this.close)
    })
  }

  close = event => {
    if (event.key === "Escape" || event.type === "click" || event.type === "closeAllDropdowns") {
      this.setState(state => ({
        ...state,
        isOpened: false,
      }), () => {
        this.setPosition()
        document.removeEventListener("click", this.close)
        document.removeEventListener("keydown", this.close)
        document.removeEventListener("closeAllDropdowns", this.close)
      })
    }
  }

  toggle = event => this.state.isOpened ? this.close(event) : this.open(event)

  componentDidMount() {
    window.addEventListener("resize", this.setPosition)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setPosition)
  }

  render() {

    const {className, children, ...otherProps} = this.props
    const {trigger, menu} = this.state
    const {state, toggle} = this

    return <div
      className={`dropdown${className ? ` ${className}` : ""}`} {...otherProps}>
      {Children.map(children, element => {

        if (!element.type) return element

        let children = element.props.children
        children = Array.isArray(children) ? [...children] : [children]

        switch (element.type.displayName) {
          case "DropdownToggle":
            return cloneElement(
              element,
              {
                ...element.props,
                ref: trigger,
                toggle,
                state
              },
              children
            )

          case "DropdownMenu":
            return cloneElement(
              element,
              {
                ...element.props,
                ref: menu,
                state
              },
              children
            )

          default:
            return element
        }
      })}
    </div>
  }
}