import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Update = () => {
    const {id} = useParams()
const [inputUser,setInputUser] = useState({
    name:'',
    email:'',
    password:'',
})    
const fetchSingleUser = async()=>{
    const res = await axios.get(`http://localhost:5171/readuser/${id}`)
    setInputUser({
        name:res.data.name,
        email:res.data.email,
        password:res.data.password,
    })
}
useEffect(()=>{
 fetchSingleUser();
},[])

  const handleChange = (event) =>{
   setInputUser({...inputUser , [event.target.name] : event.target.value})
  }
  const handleSubmit = async() =>{
    const res = await axios.patch(`http://localhost:5171/updateuser/${id}`,inputUser)
    if(res.status === 200){
        window.location ='/'
    }
  }
    return (
    <div>
    <h1 className='text-3xl my-3 mx-12'>Update User</h1>
       <div className="form flex flex-col ml-12 text-2xl">
    <p className=' w-96 flex justify-between mt-3'> Name: <input type='text' className='border-2  w-[300px] h-9 text-lg pl-1' name='name' onChange={handleChange} value={inputUser.name}/> </p>
    <p className=' w-96 flex justify-between mt-3'> E-mail: <input type='email' className='border-2  w-[300px] h-9 text-lg pl-1' name='email' onChange={handleChange} value={inputUser.email}/> </p>
    <p className=' w-96 flex justify-between mt-3'> Password: <input type='password' className='border-2  w-[300px] h-9 text-lg pl-1' name='password' onChange={handleChange} value={inputUser.password}/> </p>
    <button className='border-2 w-28 p-1 bg-orange-300 rounded-xl mt-3 hover:bg-orange-200' onClick={handleSubmit}>UPDATE</button>
   </div>
    </div>
  )
}

export default Update
