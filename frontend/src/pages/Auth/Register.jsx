import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/feautures/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'

const Register = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
      if (userInfo) {
        navigate(redirect)
      }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
      e.preventDefault()

      if (password != confirmPassword) {
        toast.error('Passwords do not match')
      } else {
        try {
          const res = await register({username, email, password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate(redirect)
          toast.success("User Successfuly Registered.")
        } catch (error) {
          console.log(error)
          toast.error(error.data.message)
        }
      }
    }

  return <section className='flex justify-center items-center flex-auto min-h-screen'>
    <div className="mr-[4rem] mt-[1rem] ml-[15rem]">
    <h1 className='text-2xl ml-[10rem] font-semibold mb-4'>Register</h1>

    <form onSubmit={submitHandler} className='container w-[40rem]'>

      <div className="my-[2rem] mt-1">
        <label htmlFor='name' className='block text-sm font-medium text-white'>
          Name
        </label>
        <input type='text' id='name' className='mt-1 p-2 border-[2px] w-[70%] border-black rounded' placeholder='Enter Name' value={username} onChange={e=> setUserName(e.target.value)} />
      </div>

      <div className="my-[2rem] ">
        <label htmlFor='email' className='block text-sm font-medium text-white'>
          Email Address
        </label>
        <input type='email' id='email' className='mt-1 p-2 border-[2px] w-[70%] border-black rounded' placeholder='Enter Email' value={email} onChange={e=> setEmail(e.target.value)} />
      </div>

      <div className="my-[2rem]">
        <label htmlFor='password' className='block text-sm font-medium text-white'>
          Password
        </label>
        <input type='password' id='password' className='mt-1 p-2 border-[2px] w-[70%] border-black rounded' placeholder='Enter Password' value={password} onChange={e=> setPassword(e.target.value)} />
      </div>

      <div className="my-[2rem]">
        <label htmlFor='confirmPassword' className='block text-sm font-medium text-white'>
          Confirm Password
        </label>
        <input type='password' id='confirmPassword' className='mt-1 p-2 border-[2px] w-[70%] border-black rounded' placeholder='Confirm Password' value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} />
      </div>

    <button disabled={isLoading} type="submit" className="bg-pink-500 ml-[10rem] text-white px-4 py-2 rounded cursor-pointer mt-0">
      {isLoading ? "Registering..." : "Register"}
    </button>

    {isLoading && <Loader />}
    </form>

    <div className='mt-4'>
      <p className='text-white ml-[6rem]'>
        Already have an account? {" "}
        <Link to = {redirect ? `/login?redirect=${redirect}` : '/login'} className='text-pink-500 hover:underline' >
        Login
        </Link>
      </p>
    </div>
    </div>
  </section>
};

export default Register