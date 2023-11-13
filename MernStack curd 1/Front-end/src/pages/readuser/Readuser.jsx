import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Readuser = () => {
    const {id}= useParams()
    const [usersData,setUsersData] = useState([])
    const fetchSingleUser = async()=>{
        const res = await axios.get(`http://localhost:5171/readuser/${id}`)
        setUsersData(res.data)
    }
    useEffect(()=>{
     fetchSingleUser();
    },[])
    return (
    <div>
          <div className="container p-3  m-auto mt-1">
  <ul className='capitalize grid grid-cols-4'>
    <li className='text-2xl bg-blue-700 text-yellow-300  font-bold'>name</li>
    <li className='text-2xl bg-blue-700 text-yellow-300 font-bold text-center col-span-2'>email</li>
    <li className='text-2xl bg-blue-700 text-yellow-300 font-bold text-center'>password</li>
    
    
    <li className='italic  text-xl'>{usersData.name}</li>
    <li className='italic col-span-2 text-center text-xl'>{usersData.email}</li>
    <li className='text-center italic text-xl'>{usersData.password}</li>
   
  </ul>
  </div>
  <h1 className='text-3xl m-9'>Time while created = {new Date(usersData.createdAt).toLocaleString()} </h1>
  <h1 className='text-2xl m-9'> Updated at= {new Date(usersData.updatedAt).toLocaleString() === new Date(usersData.createdAt).toLocaleString() ? 'No update till now' : new Date(usersData.updatedAt).toLocaleString()} </h1>
    </div>
  )
}

export {Readuser}
