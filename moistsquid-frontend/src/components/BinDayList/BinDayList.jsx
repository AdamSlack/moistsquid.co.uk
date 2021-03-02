import React from 'react'
import { BinDayListItem } from '../BinDayListItem'
import './BinDayList.css'

export const BinDayList = (props) => {
  const { binDays } = props

  return (
    <ul className="binDayList">
      {
        binDays.map((binDay) => (
          <BinDayListItem key={binDay.binColour} {...binDay} />
        ))
      }
    </ul>
  )
}

export default BinDayList