import React, {forwardRef} from "react"

const Toggle = forwardRef((props, ref) => {

  const {className, children, toggle, state, ...otherProps} = props

  return <div ref={ref} onClick={toggle} {...otherProps}
              className={`dropdown-toggle${state.isOpened ? " hover" : ""}${className ? ` ${className}` : ""}`}>
    <button type="button" className="btn btn-toggle">{children}</button>
    <button type="button" className="btn btn-toggle dropdown-toggle-caret"/>
  </div>
})

Toggle.displayName = "DropdownToggle"

export default Toggle