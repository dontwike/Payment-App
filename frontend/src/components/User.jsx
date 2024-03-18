import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const User = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate('')

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk/?filter=${filter}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response)
                setUsers(response.data.User)
            }).catch(error => {
                console.log(error)
            })
    }, [filter])

    return (
        <div className='flex flex-col shadow-md p-9'>
            <div className='font-bold text-lg'>
                Users
            </div>

            <div className='py-3'>
                <input type="text" placeholder='Search Users...' className='border border-gray-200 w-full px-5 py-2' onChange={(e) => { setFilter(e.target.value) }} />
            </div>

            <div>
                {
                    users.map((user) => <UserDetails key={user._id} user={user} />)
                }
            </div>
        </div>
    )

    function UserDetails(props) {
        return (
            <div key={props.user._id} className='flex justify-between mt-8  items-center'>
                <div className='flex text-md font-semibold items-center justify-center'>

                    <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
                        <div className=' flex flex-col justify-center h-full text-xl'>
                            {(props.user.firstName).charAt(0)}
                        </div>
                    </div>

                    <div className='mr-1'>
                        {props.user.firstName}
                    </div>
                    <div>
                        {props.user.lastName}
                    </div>
                </div>

                <div>
                    <button onClick={() => { navigate(`/send?id=${props.user._id}&name=${props.user.firstName}`) }} className='bg-slate-800 text-white px-5 py-2 rounded-lg text-sm'>Send Money</button>
                </div>
            </div>
        )
    }
}


export default User