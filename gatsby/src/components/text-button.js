import React from "react"

export default React.forwardRef(function (props, ref) {
  const { className, ...buttonProps } = props
  return (
    <button ref={ref} className={`btn-text ${className}`} {...buttonProps} />
  )
})
