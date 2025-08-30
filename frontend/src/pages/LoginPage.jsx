import React, { useContext, useState } from 'react'
import assets from '../assets/asset'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'
import Agreement from '../components/Agreement'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [currState, setCurrState] = useState('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)
  const [accepted, setAccepted] = useState(false) // for accepting licence and agreement and use of terms
  const [acceptedLinkClicked, setAcceptedLinkClicked] = useState(false) //for navigating to licence and agreement component
  const { setToken, api } = useContext(AuthContext)

  // function to login
  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status === 200) {
        const {
          data: { token },
        } = res;
        localStorage.setItem("token", token);
        toast.success(res.data.message)
        setToken(token);
        return true;
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message);
    }
    return false;
  };

  const signup = async ({ fullName, email, password, bio }) => {
    try {
      const res = await api.post("/auth/signup", { fullName, email, password, bio });
      if (res.status === 200) {
        toast.success(res.data.message)
        return true;
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Signup failed");
    }
    return false;
  };
  const submitHandler = async (event) => {
    event.preventDefault()
    if (currState === 'sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }
    if (currState === 'login') {
      if (await login({ email, password })) {
        setPassword('')
      }

    } else {
      if (accepted) {
        if (await signup({ fullName, email, password, bio })) {
          setFullName('')
          setEmail('')
          setPassword('')
          setBio('')
          setIsDataSubmitted(false)
          setAccepted(false)
          setAcceptedLinkClicked(false)
          setCurrState('login')
        }
      } else {
        toast.error('You need to agree to the terms of use & privacy policy to proceed')
      }

    }
  }

  return (acceptedLinkClicked && !accepted && currState == 'sign up') ? <Agreement setAccepted={setAccepted} /> : (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* -------left---------*/}
      <img src={assets.logoIcon} alt='' className='w-[min(30vw,250px)]' />
      {/* -------right---------*/}
      <form onSubmit={submitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}

          {isDataSubmitted && <FontAwesomeIcon icon={faSquareCaretLeft} className='cursor-pointer' onClick={() => setIsDataSubmitted(false)} />}
        </h2>
        {currState === 'sign up' && !isDataSubmitted && (
          <input type='text' className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required value={fullName} onChange={(e) => setFullName(e.target.value)} />
        )}
        {!isDataSubmitted && (
          <>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email Address' className='p-2 border border-gray-500 rounded-md focus:outline-none 
  focus:ring-2 focus:ring-indigo-500' required />
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className='p-2 border border-gray-500 rounded-md focus:outline-none 
  focus:ring-2 focus:ring-indigo-500' required />
          </>
        )}
        {
          currState === 'sign up' && isDataSubmitted && (
            <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none 
  focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio' required ></textarea>
          )
        }
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === 'sign up' ? 'Create Account' : 'Login Now'}
        </button>
        {currState === 'sign up' && <div className='flex items-center gap-2 text-sm text-gray-500'>
          <p onClick={(e) => { setAcceptedLinkClicked(true); }} className='cursor-pointer text-white'>Agree to the terms of use & privacy policy.</p>
        </div>}
        <div className='flex flex-col gap-2'>
          {currState === "sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account?
              <span className='font-medium text-violet-500 cursor-pointer ml-2' onClick={() => { setCurrState('Login'); setIsDataSubmitted(false) }}>Login here</span>
            </p>
          ) : (<p className='text-sm text-gray-600'>Create an account?
            <span className='font-medium text-violet-500 cursor-pointer ml-2' onClick={() => setCurrState('sign up')}>Click here</span>
          </p>)}

        </div>
      </form>
    </div>
  )
}

export default LoginPage