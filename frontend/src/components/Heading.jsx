import React from 'react'

const Heading = (props) => {
  return (
    <div className='text-slate-900 text-2xl font-bold pb-3'>
        {props.title}
    </div>
  )
}

export default Heading