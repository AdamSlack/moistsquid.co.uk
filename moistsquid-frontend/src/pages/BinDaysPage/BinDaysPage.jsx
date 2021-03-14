import React, { useEffect, useState } from 'react'
import { fetchBinDays } from '../../services'
import {
  BinDayList,
} from '../../components'
import BinDayListErrorCard from '../../components/BinDayListErrorCard/BinDayListErrorCard'
import { BinDayListLoadingCard } from '../../components/BinDayListLoadingCard'

export const BinDaysPage = (props) => {

  const [binDays, setBinDays] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [requestError, setRequestError] = useState('')

  useEffect(() => {
    setIsLoading(true)
    fetchBinDays()
    .then((binDays) => {
      setBinDays(binDays)
      setIsLoading(false)
    })
    .catch((err) => {
      setRequestError(err || 'Something went wrong!')}
    )
  }, [])

  if(requestError) {
    return <BinDayListErrorCard />;
  }

  return (
    <>
      { isLoading ? (<BinDayListLoadingCard />): (<BinDayList binDays={binDays}/>)}
    </>
  )
}

export default BinDaysPage;