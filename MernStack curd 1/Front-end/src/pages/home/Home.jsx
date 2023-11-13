import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [usersData , setUsersData] = useState([]);
const [inputUser , setInputUser] = useState({
  name:'',
  email:'',
  password:'',
});



const handleChange = (event)=>{
 setInputUser({...inputUser , [event.target.name] : event.target.value})
}
const handleSubmit = async()=>{
  const res = await axios.post('http://localhost:5171/createuser',inputUser)
  if(inputUser.name ==='' || inputUser.email==='' || inputUser.password===''){
     toast.error('please fill all the form')
  }else{
    fetchAllUsers();
    setInputUser({name:'',email:'',password:''})
  }
}
  const fetchAllUsers = async()=>{
   const res = await axios.get('http://localhost:5171/readallusers');
   setUsersData(res.data);
  }
 
  useEffect(()=>{
  fetchAllUsers();
  },[]);

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        handleSubmit();
      } 
    };
    document.addEventListener('keydown', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyUp);
    };
  }, [handleSubmit]);

  const handleDelete = async(id)=>{
   const res = await axios.delete(`http://localhost:5171/deleteuser/${id}`)
   if(res.status === 200){
    fetchAllUsers();
   }
  }
  return (
  <>
   <div className="form flex flex-col ml-12">
    <p className=' w-64 flex justify-between mt-3'> Name: <input type='text' className='border-2  w-40 h-5 text-sm' name='name' onChange={handleChange} value={inputUser.name}/> </p>
    <p className=' w-64 flex justify-between mt-3'> E-mail: <input type='email' className='border-2  w-40 h-5 text-sm' name='email' onChange={handleChange} value={inputUser.email}/> </p>
    <p className=' w-64 flex justify-between mt-3'> Password: <input type='password' className='border-2  w-40 h-5 text-sm' name='password' onChange={handleChange} value={inputUser.password}/> </p>
    <button className='border-2 w-28 p-1 bg-orange-300 rounded-xl mt-3 hover:bg-orange-200' onClick={handleSubmit}>SUBMIT</button>
   </div>


    <div className="container p-3  m-auto mt-1">
  <ul className='capitalize grid grid-cols-6'>
    <li className='text-2xl bg-blue-700 text-yellow-300  font-bold '>sn</li>
    <li className='text-2xl bg-blue-700 text-yellow-300  font-bold'>name</li>
    <li className='text-2xl bg-blue-700 text-yellow-300 font-bold text-center col-span-2'>email</li>
    <li className='text-2xl bg-blue-700 text-yellow-300 font-bold text-center'>password</li>
    <li className='text-2xl bg-blue-700 text-yellow-300 font-bold text-center'>actions</li>
    { usersData.map((curval,id)=>{
      return(<>
    <li className='italic ml-3 w-0'>{id+1}</li>
    <li className='italic '>{curval.name}</li>
    <li className='italic col-span-2 text-center'>{curval.email}</li>
    <li className='text-center italic'>* * *</li>
    <li className='text-lg text-center'>
    <Link to={`/read/${curval._id}`}> <button className='border-2 px-2 capitalize hover:bg-slate-50 text-green-500'>read</button></Link>
     <Link to={`/update/${curval._id}`}> <button className='border-2 px-2 capitalize hover:bg-slate-50 text-yellow-500'>edit</button> </Link>
     <button className='border-2 px-2 capitalize hover:bg-slate-50 text-red-500' onClick={()=>handleDelete(curval._id)}>delete</button>
     </li>
</>
      )})
    }
  </ul>
  </div>
  <ToastContainer/>
  </>
  )
}

export {Home}
