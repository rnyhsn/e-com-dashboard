import React from 'react'

const ItemNotFound = ({message}: {message: string}) => {
  return (
    <div className="h-[550px] flex items-center justify-center">
      <h1 className="text-5xl dark:text-gray-700"> {message}  </h1>
    </div>
  )
}

export default ItemNotFound
