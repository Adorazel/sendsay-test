import React, {useRef, useState, useEffect} from "react"

const Console = props => {

  const [dividerPosition, setDividerPosition] = useState(.5)
  const divider = useRef()

  const setPosition = percentage => {
    percentage = Math.min(.8, percentage)
    percentage = Math.max(.2, percentage)
    setDividerPosition(percentage)
  }

  const onMouseDown = () => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  const onMouseMove = event => {
    setPosition(event.clientX / window.innerWidth)
  }

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
  }

  const onTouchStart = () => {
    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("touchend", onTouchEnd)
  }

  const onTouchMove = event => {
    setPosition(event.touches[0].clientX / window.innerWidth)
  }

  const onTouchEnd = () => {
    window.removeEventListener("touchmove", onTouchMove)
    window.removeEventListener("touchend", onTouchEnd)
  }

  useEffect(() => {
    const initialPosition = localStorage.getItem("SENDSAY_DIVIDER_POSITION") || ".5"
    setDividerPosition(parseFloat(initialPosition))
  }, [])

  useEffect(() => {
    if (dividerPosition !== .5) localStorage.setItem("SENDSAY_DIVIDER_POSITION", "" + dividerPosition)
  }, [dividerPosition])

  return <section className="console">
    <div className="console__left" style={{width: `${100 * dividerPosition}%`}}>
      <label htmlFor="request">Запрос:</label>
      <textarea name="request" id="request" className="console__field"/>
    </div>
    <div ref={divider} onMouseDown={onMouseDown} onTouchStart={onTouchStart} className="console__divider"/>
    <div className="console__right" style={{width: `${100 * (1 - dividerPosition)}%`}}>
      <label htmlFor="response">Ответ:</label>
      <textarea name="response" id="response" className="console__field"/>
    </div>
  </section>
}

export default Console