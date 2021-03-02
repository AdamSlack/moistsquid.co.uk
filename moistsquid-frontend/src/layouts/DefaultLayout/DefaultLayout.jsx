import React from 'react'
import { Header } from '../../components';

export const DefaultLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default DefaultLayout;