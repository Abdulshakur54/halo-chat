import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/asset'
import {toast} from '../lib/utils'
import { AuthContext } from '../contexts/authContext'
import { allowedExtensions, maxUploadFileSize } from '../lib/constants'
import Image from '../components/CloudinaryImage'
import SubmitButton from '../components/SubmitButton'

const ProfilePage = () => {
  const { api, authUser, setAuthUser } = useContext(AuthContext)
  const [selectedImg, setSelectedImg] = useState(null)
  const [fullName, setFullName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const updateProfile = async (data, id) => {
    try {
      setLoading(true)
      const res = await api.put(`/api/v1/users/${id}`, data)
      setAuthUser(res.data.data.user)
      toast.success('Profile updated successfully')
      return true
    } catch (err) {
      setLoading(false)
      toast.error(err.response?.data?.message || err.message);
      return false
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedImg) {
      if (await updateProfile({ fullName, bio }, authUser._id)) {
        navigate('/')
      }
      return
    }
    const formData = new FormData()
    formData.append('profilePic', selectedImg)
    formData.append('fullName', fullName)
    formData.append('bio', bio)
    if (await updateProfile(formData, authUser._id)) {
      navigate('/')
    }


  }

  const validateImage = (e) => {
    const file = e.target.files[0]
    if (file && file.size > (maxUploadFileSize)) {
      e.target.value = ""
      toast.error(`Image should not be greater than ${(maxUploadFileSize / 1024) / 1024}MB`)
      return
    }
    setSelectedImg(file)
  }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1' encType='multipart/form-data'>
          <h3 className='text-lg'>Profile details</h3>
          <label htmlFor='profileImage' className='flex items-center gap-3 cursor-pointer underline'>
            <input onChange={validateImage} type='file' id='profileImage' accept={allowedExtensions.join(', ')} hidden name="profileimage" />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatarIcon} alt='' className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
            Upload profile image
          </label>
          <input type="text" required placeholder='Your name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 
          focus:ring-violet-500' onChange={(e) => setFullName(e.target.value)} value={fullName} />
          <textarea rows={4} onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write profile bio' required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'>
          </textarea>
          <SubmitButton text={`${loading ? 'Updating ...': 'Update'}`} loading={loading} className={'bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'} />
        </form>
        {(authUser?.profilePicId) ?
          <Image className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} src={authUser.profilePicId} /> :
          <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} src={assets.logoIcon} alt='' />}
      </div>

    </div>
  )
}

export default ProfilePage