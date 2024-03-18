import React from 'react'

const Label = (props) => {
  return (
    <div className='text-md font-semibold pb-2'>
        {props.label}
        <input type="text" placeholder={props.placeholder} onChange={props.onChangeEvent} className='rounded-md border border-gray-300 px-5 py-2 w-full text-sm font-normal' /> 
    </div>
  )
}

export default Label