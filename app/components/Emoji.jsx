import React from 'react'

const Emoji = ({color}) => {
    console.log(color)
  return (
    <div className={`bg-${color}-500 px-2 py-1 shadow-lg rounded mt-2`}>
        {/* <p>The color is {color}</p> */}
        { color === "red" ? <p>The color is red</p> : <p>The color is not red, but it's {color}</p>}
        <p>This is a Emoji</p>
    </div>
  )
}

export default Emoji