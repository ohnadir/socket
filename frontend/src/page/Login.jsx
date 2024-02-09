import React, { useEffect, useState } from 'react'
import { Input, message } from 'antd';
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../Redux/slice/anotherAuthSlice';
import Cookies from 'js-cookie';


const Login = () => {
    const [auth, setAuth] = useState();
    const [ login, { isLoading, isError, data: user, error} ]= useLoginMutation();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    
    const handleChange=(e)=>{
        setAuth(prev=>({...prev,  [e.target.name]: e.target.value}))
    }
    if(user?.token){
        Cookies.set('token', (user?.token), { expires: 7 })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        login(auth)
    }
    useEffect(()=>{
        if(user?.user?._id){
            messageApi.success("Login Successful")
            setTimeout(()=> {
                navigate("/single");
            }, 1000);
        }
    }, [user?.user?._id])

    return (
        <>
            {contextHolder}
            <div 
                className='
                    flex 
                    items-center 
                    justify-center 
                    w-full 
                    h-[88vh]
                '
            >
                <div 
                    className='
                        grid 
                        grid-cols-1 
                        gap-3 
                        max-w-[700px] 
                        shadow-md 
                        p-4 
                        border
                        rounded-xl
                    '
                    >
                    <h1 
                        className='
                            text-2xl 
                            text-[#0071E3] 
                            mb-5 
                            font-bold 
                            text-center
                        '
                    >
                        Login In
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            name='email'
                            onChange={handleChange} 
                            placeholder="Enter Your Valid Email" 
                            prefix={<HiOutlineMail size={24} className='mr-2' color="#0071E3" />} 
                            style={{
                                border: "1px solid #0071E3",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                marginBottom: "20px",
                            }}
                        />
                        <Input.Password
                            name='password'
                            onChange={handleChange} 
                            placeholder="Enter Your Password" 
                            prefix={<GoLock className='mr-2' size={24} color="#0071E3" />} 
                            style={{
                                border: "1px solid #0071E3",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                marginBottom: "20px",
                            }}
                        />
                        <button type='submit' className='w-full mb-5 bg-[#0071E3] h-[46px] text-white font-medium rounded-lg'>{ isLoading ? "loading" : "Login" }</button>
                        <Link to="/register">
                            <h4 className='text-[#0071E3] font-semibold text-right'>Create a new Account? Register</h4>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login