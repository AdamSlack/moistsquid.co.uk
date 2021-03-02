import React, { useEffect, useState } from 'react'
import { fetchBinDays } from '../../services'
import {
  BinDayList
} from '../../components'

export const BinDaysPage = (props) => {

  const [binDays, setBinDays] = useState([])

  useEffect(() => {
    fetchBinDays().then(setBinDays)
  }, [])

  return (
    <div>
      <h1>
        Hello World  
      </h1>
      <BinDayList binDays={binDays}/>

    </div>
  )
}

export default BinDaysPage;