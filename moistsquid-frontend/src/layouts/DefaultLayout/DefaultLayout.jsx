import React from 'react'
import { Header } from '../../components';
import './DefaultLayout.css'

export const DefaultLayout = (props) => {
  const { children } = props;
  return (
    <>
      <div className='page-content'>
      <Header />
        {children}
      </div>
    </>
  )
}

export default DefaultLayout;