import React, { useState } from 'react'
import Label from '../components/Label'
import Heading from '../components/Heading'
import Desc from '../components/desc'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const signin = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleOnClick() {
    await axios.post('http://localhost:3000/api/v1/user/signin', {
      username,
      password
    }).then((response) => {
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
      console.log('User Signin Success')
    }).catch((err) => {
      console.log('User Signin Failed,' + err);
    });
  }

  return (
    <div className='flex justify-center items-center pt-10 w-full'>
      <div className='shadow-md p-10 flex items-center justify-center flex-col'>

        <Heading title='Sign In' />
        <Desc description="Enter your information to log into the account"/>

        <div className='w-full'>

          <Label label='Username' placeholder='dontwike' onChangeEvent={(e) => { setUsername(e.target.value) }} />

          <Label label='Password' placeholder='' onChangeEvent={(e) => { setPassword(e.target.value) }} />

          <button className='bg-gray-950 text-white w-full mt-5 py-2 rounded-md text-sm font-semibold' onClick={handleOnClick}>Sign Up</button>
          <p className='w-full flex items-center justify-center mt-3 text-sm'>Already have an account? <a className='underline pl-2' href='#forgot-Pass'>Login</a></p>
        </div>

      </div>

    </div>
  )
}

export default signin