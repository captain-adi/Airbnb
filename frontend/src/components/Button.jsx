import React from 'react'

function Button({text,onClick}) {
  return (
    <button onClick={onClick} type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{text}</button>
  )
}

export default Button
