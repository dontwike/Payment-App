import React from 'react'
import { useNavigate } from 'react-router-dom';

const Appbar = () => {

    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-between shadow-sm'>
            <div className='text-2xl font-bold p-4'>
                Payment App
            </div>

            <div className='flex'>
                <div className='p-4 flex justify-center items-center font-semibold'>
                    Hello
                </div>

                <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
                    <div className=' flex flex-col justify-center h-full text-xl'>
                        U
                    </div>
                </div>
                
                <div className='flex justify-center items-center mx-4'>
                    <button className='bg-slate-700 py-1 px-5 rounded-md text-white font font-semibold opacity-85 hover:opacity-100' onClick={()=>{
                        localStorage.removeItem('token');
                        navigate('/signin');
                    }}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Appbar