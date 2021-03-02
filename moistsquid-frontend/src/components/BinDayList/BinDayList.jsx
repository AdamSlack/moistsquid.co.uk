import React from 'react'
import { BinDayListItem } from '../BinDayListItem'

export const BinDayList = (props) => {
  const { binDays } = props

  return (
    <ul>
      {
        binDays.map(({ binColour }) => (
          <BinDayListItem binColour={binColour} key={binColour} />
        ))
      }
    </ul>
  )
}

export default BinDayList