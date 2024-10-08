import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state)=>state.user); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]: e.target.value});
  }
  const handleSubmit = async(e)=>{
    e.preventDefault(); 
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    }catch(error){
      dispatch(signInFailure(error));
    };
  };
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-6'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        
        <input type="email" 
        placeholder='Email' 
        id='email' 
        className='bg-slate-100 p-3 rounded-lg '
        onChange={handleChange}
        />
        <input type="password" 
        placeholder='Password' 
        id='password' 
        className='bg-slate-100 p-3 rounded-lg '
        onChange={handleChange}
        />
        <button disabled={loading} className='bg-green-700 p-3 rounded-lg text-white uppercase hover:opacity-90
         disabled:placeholder-opacity-85'>
          {loading? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'> 
        <p>New User?</p>
        <Link to='/signup'>
        <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-600 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
  )
}
