import React, { useState } from 'react'
import Label from '../components/Label'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import Appbar from '../components/Appbar';

const send = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const [amt, setAmt] = useState()

  function handleOnClickSend() {
    axios.post('http://localhost:3000/api/v1/account/transfer', {
      to: id,
      amount: amt
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      console.log(response);
      navigate('/dashboard')
    }).catch((error) => {
      console.log(error);
    })
  }

return (
  <div>
    <Appbar />

    <div className='flex items-center justify-center h-screen w-full flex-col'>


      <div className='flex items-center justify-center flex-col shadow-md p-9'>
        <div className='text-2xl font-bold p-4'>
          Send Money {
            console.log(id, name)
          }
        </div>

        <div className='flex flex-row items-center justify-center p-7'>
          <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
            <div className=' flex flex-col justify-center h-full text-xl'>
              {name.charAt(0)}
            </div>
          </div>
          <div className='text-2xl font-semibold ml-3'>
            {name}
          </div>
        </div>

        <div className='p-4 flex items-center flex-col justify-center'>
          <Label label="Amount (Rs)" placeholder="50" onChangeEvent={(e) => { setAmt(parseInt(e.target.value)) }} />
          <button className='mt-3 bg-green-600 py-2 px-5 text-white rounded-md w-full' onClick={handleOnClickSend}
          >Initiate Transfer</button>
        </div>
      </div>
    </div>
  </div>

)
}

export default send