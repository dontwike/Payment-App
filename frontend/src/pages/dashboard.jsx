import React from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import User from '../components/User'

const dashboard = () => {
  return (
    <div>
      <Appbar/>
      <Balance/>
      <User/> 
    </div>
  )
}

export default dashboard