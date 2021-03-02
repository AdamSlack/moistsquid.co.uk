import React from 'react'

import './BinDayListItem.css'

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

export const BinDayListItem = (props) => {
  const { binColour, nextCollections } = props

  const isTomorrow = nextCollections.some((dateString) => {
    const nextDate = new Date(dateString);
    const now = new Date()
    return nextDate - now < TWENTY_FOUR_HOURS
  })

  const classNames = [
    `binColour${binColour}`
  ]

  if(isTomorrow) {
    classNames.push('isTomorrow')
  }

  return (
    <li
      className={classNames.join(' ')}
    >{binColour} | {nextCollections.join(' | ')}</li>
  )
}

BinDayListItem.defaultProps = {
  nextCollections: ['None']
}

export default BinDayListItem