import React, { useState } from 'react'
import { Input } from 'antd';
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";

const Login = () => {
    const [auth, setAuth] = useState()
    const handleChange=(e)=>{
        setAuth(prev=>({...prev,  [e.target.name]: e.target.value}))
    }
    return (
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
                <form action="">
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
                        bordered={false}
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
                        bordered={false}
                    />
                    <button type='submit' className='w-full bg-[#0071E3] h-[46px] text-white font-medium rounded-lg'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login