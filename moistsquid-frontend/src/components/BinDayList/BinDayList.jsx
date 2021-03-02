import React from 'react'
import { BinDayListItem } from '../BinDayListItem'

export const BinDayList = (props) => {
  const { binDays } = props

  return (
    <ul>
      {
        binDays.map((binDay) => (
          <BinDayListItem key={binDay.binColour} {...binDay} />
        ))
      }
    </ul>
  )
}

export default BinDayList