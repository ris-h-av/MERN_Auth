import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData, setFormData] = useState({
  });
  console.log(formData)
  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image]);
  const handleFileUpload = async (image) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
    (error)=>{
      setImageError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadUrl)=>
        setFormData({
          ...formData,profilePicture:downloadUrl  
        })
      );
    }
  );
};
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className='text-3xl font-semibold text-center my-8'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=> setImage(e.target.files[0])}/>
        <img 
          src={currentUser.profilePicture} 
          alt="Profile Pic" 
          className="h-24 w-24 self-center object-cover rounded-full cursor-pointer"
          onClick={()=> fileRef.current.click()}
        />
        <p className="text-sm self-center">
        {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
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
