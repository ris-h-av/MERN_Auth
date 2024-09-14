import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='bg-green-700'>
        <div className='flex justify-between items-center max-w-5xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-white'>Auth App</h1>
            </Link>
            <ul className='flex gap-5 text-white'>
                <Link to={'/'}>
                <li>Home</li> 
                </Link>
                <Link to={'/about'}>
                <li>About</li>
                </Link>
                <Link to='/profile'>
                  {currentUser ? (
                    <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
                  ) : (
                    <li>Sign In</li>
                  )}
                </Link>
            </ul>
        </div>
    </div>
  )
}
