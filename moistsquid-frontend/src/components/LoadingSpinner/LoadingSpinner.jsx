import React from 'react'
import './LoadingSpinner.css'

export const LoadingSpinner = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default LoadingSpinner