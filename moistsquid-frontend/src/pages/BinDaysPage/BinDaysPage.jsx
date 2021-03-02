import React, { useEffect, useState } from 'react'
import { fetchBinDays } from '../../services'
import {
  BinDayList,
  LoadingSpinner,
} from '../../components'

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
    return (
      <>
        <p>Well this is embarrasing!</p>
        <p>It looks like the request get bin times didn't work.</p>
        <p>Please try again later!</p>
      </>
    )
  }

  return (
    <>
    {
      isLoading 
      ? (
        <>
          <h2> Fetching Bin Days!</h2>
          <p> if it takes longer than 15 seconds, then the app will fail :(</p>
          <p> Please retry if it does!</p>
          <LoadingSpinner />
        </>
      ): (<BinDayList binDays={binDays}/>)
    }
    </>
  )
}

export default BinDaysPage;