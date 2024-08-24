import {Link} from 'react-router-dom'

export default function () {
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-6'>Sign Up</h1>
      <form className='flex flex-col gap-5'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg '/>
        <input type="email" placeholder='Email' id='username' className='bg-slate-100 p-3 rounded-lg '/>
        <input type="password" placeholder='Password' id='username' className='bg-slate-100 p-3 rounded-lg '/>
        <button className='bg-green-700 p-3 rounded-lg text-white uppercase hover:opacity-90'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'> 
        <p>Have an account?</p>
        <Link to='/signin'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
