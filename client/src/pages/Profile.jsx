import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className='text-3xl font-semibold text-center my-8'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img 
          src={currentUser.profilePicture} 
          alt="Profile Pic" 
          className="h-24 w-24 self-center object-cover rounded-full cursor-pointer"
        />
        <input defaultValue={currentUser.username} 
              type="text" 
              id="username" 
              placeholder="Username" 
              className="bg-slate-200 p-3 rounded-lg" 
        />
        <input defaultValue={currentUser.email} 
              type="email" 
              id="email" 
              placeholder="Email" 
              className="bg-slate-200 p-3 rounded-lg" 
        />
        <input type="password" 
              id="password" 
              placeholder="Password" 
              className="bg-slate-200 p-3 rounded-lg" 
        />
        <button className="bg-green-900 text-white p-3 rounded-lg uppercase hover:bg-green-700 disabled:bg-green-500">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-6">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
