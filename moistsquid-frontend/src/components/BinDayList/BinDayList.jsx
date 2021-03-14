import React from 'react'
import { BinDayListItem } from '../BinDayListItem'
import './BinDayList.css'

const DAY_IN_MS = 24 * 60 * 60 * 1000

const msDayDifference = (a, b) => Math.round((b - a) / DAY_IN_MS);

const getDayOfWeek = (date) => new Intl.DateTimeFormat('en-GB', { weekday: 'long'}).format(date)

export const BinDayList = (props) => {
  const { binDays } = props
  const binDatesInMS = binDays
    .map(({nextCollections}) => nextCollections)
    .flat()
    .map((dateString) => new Date(dateString).getTime())
  
  binDatesInMS.sort()

  const todayDate = new Date();

  const nextBinDate = binDatesInMS[0] || todayDate.getTime();
 
  const nextBinColour = (binDays.find(({nextCollections}) => {
    return nextCollections.some((binDate) => new Date(binDate).getTime() === nextBinDate)
  }) || {}).binColour

  const daysAway = msDayDifference(todayDate.getTime(), nextBinDate)

  return (
    <>
      <h2>Next Bin Day</h2>
      {nextBinDate && (
        <div className="binDayList">
          <p>
            Next Collection Date: {new Date(nextBinDate).toISOString().split('T')[0]} ({getDayOfWeek(nextBinDate)})
          </p>
          <p>
            Today is: {todayDate.toISOString().split('T')[0]} ({getDayOfWeek(todayDate)})
          </p>
          <p>
            The next collection is {daysAway} Days Away!
          </p>
          <p>
            You will need to the <b className={nextBinColour}>{nextBinColour}</b> bin out in {daysAway - 1 } days (Before you go to bed!)
          </p>
        </div>
      )}
      <h2>Upcoming Dates</h2>
      <ul className="binDayList">
        {
          binDays.map((binDay) => (
            <BinDayListItem key={binDay.binColour} {...binDay} />
          ))
        }
      </ul>
    </>
  )
}

export default BinDayList