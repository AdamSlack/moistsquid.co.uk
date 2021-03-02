import React from 'react'

export const BinDayListItem = (props) => {
  const { binColour, collectionDates } = props
  return (
    <li>{binColour} | {collectionDates.join(' | ')}</li>
  )
}

BinDayListItem.defaultProps = {
  collectionDates: ['None']
}

export default BinDayListItem