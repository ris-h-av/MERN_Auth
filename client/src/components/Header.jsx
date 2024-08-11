import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className='bg-slate-300'>
        <div className='flex justify-between items-center max-w-5xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold'>Auth App</h1>
            </Link>
            <ul className='flex gap-5'>
                <Link to={'/'}>
                <li>Home</li> 
                </Link>
                <Link to={'/about'}>
                <li>About</li>
                </Link>
                <Link to={'/signin'}>
                <li>Sign In</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}
