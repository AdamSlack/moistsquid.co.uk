import React from 'react';

import { LoadingSpinner } from '../../components'

export const BinDayListLoadingCard = () => {
  return (
    <>
      <h2> Fetching Bin Days!</h2>
      <p> if it takes longer than 15 seconds, then the app will fail :(</p>
      <p> Please retry if it does!</p>
      <LoadingSpinner />
    </>
  )
}

export default BinDayListLoadingCard;