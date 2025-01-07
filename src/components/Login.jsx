import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as authlogin} from '../store/authslice'
import {Button ,Input,Logo} from "./index"
import authservice from "../appwrite/auth"
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register ,handleSubmit} = useForm()
    const [error,seterror] = useState("")
    const login = async(data)=>{
        seterror("")
        try {
            const session =await authservice.login(data)
            if(session){
                const userdata = await authservice.getaccount()
                if(userdata){
                    dispatch(authlogin(userdata))
                    navigate("/")
                }
            }
        }
        catch(error){
            throw error
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width="100%"/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
        Don&apos;t have any account?&nbsp;
        <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline
        
        '>
            Sign Up
        </Link>
        
        
        </p>
        {error&& <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form action="" onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input 
                label="Email:"
                placeholder="enter your email"
                type="email"
                {...register("email" ,{
                    required:true,
                    validate:{
                        matchPattern:(value) =>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "emsil address must be valid address"
                    }
                 })}
                
                
                />
                <Input
                label ="password:"
                type="password"
                placeholder="enter your password"
                {...register("password",{
                    required:true
                })}
                
                
                />
                <Button type="submit" className="w-full">
                    Sign in
                </Button>
            </div>

        </form>
        </div>
      
    </div>
  )
}

export default Login
