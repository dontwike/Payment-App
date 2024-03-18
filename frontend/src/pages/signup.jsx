import React, { useState } from 'react'
import Heading from '../components/Heading'
import Desc from '../components/desc'
import Label from '../components/Label'
import axios from 'axios'

const signup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleOnClick() {
    await axios.post('http://localhost:3000/api/v1/user/signup',{
      username,
      password,
      firstName,
      lastName
    }).then(response => {
      localStorage.setItem('token', response.data.token)
      alert('User signed up successfully!')
    }).catch(error => {
      alert('Error: ' + error.message)
    })
  }

  return (

    <div className='flex justify-center items-center pt-10 w-full'>
      <div className='shadow-md p-10 flex items-center justify-center flex-col'>

        <Heading title='Signup' />
        <Desc description="Enter your information to create the account" />

        <div className='w-full'>
          <Label label='First Name' placeholder='John' onChangeEvent={(e) => { setFirstName(e.target.value) }} />

          <Label label='Last Name' placeholder='Doe' onChangeEvent={(e) => { setLastName(e.target.value) }} />

          <Label label='Username' placeholder='dontwike' onChangeEvent={(e) => { setUsername(e.target.value) }} />

          <Label label='Password' placeholder='' onChangeEvent={(e) => { setPassword(e.target.value) }} />

          <button onClick={handleOnClick} className='bg-gray-950 text-white w-full mt-5 py-2 rounded-md text-sm font-semibold'>Sign Up</button>
          <p className='w-full flex items-center justify-center mt-3 text-sm'>Already have an account? <a className='underline pl-2' href='#forgot-Pass'>Login</a></p>
        </div>

      </div>

    </div>
  )
}

export default signup