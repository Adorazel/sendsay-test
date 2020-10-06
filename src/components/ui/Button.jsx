import React, {forwardRef} from "react"

const Button = forwardRef((props, ref) => {

  const {variant = "primary", loading, children, className, ...otherProps} = props

  return <button type="button" ref={ref} className={`btn btn-${variant}${loading ? " loading" : ""}${className ? ` ${className}` : ""}`} {...otherProps}>
    {children}
  </button>
})

export default Button