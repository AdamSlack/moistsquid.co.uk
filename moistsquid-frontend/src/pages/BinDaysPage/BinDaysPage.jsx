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
    <BinDayList binDays={binDays}/>
  )
}

export default BinDaysPage;