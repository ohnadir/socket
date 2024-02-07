import React, { useState } from 'react'
import { Input, message } from 'antd';
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { useNavigate, } from "react-router-dom"
import { useDispatch } from "react-redux"
import { register } from '../Redux/slice/authSlice';

const Register = () => {
    const [auth, setAuth] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const handleChange=(e)=>{
        setAuth(prev=>({...prev,  [e.target.name]: e.target.value}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(register(auth)).unwrap()
        .then(() => {
            messageApi.success("Login Successful")
            setTimeout(()=> {
                navigate("/single");
            }, 1000);
        })
        .catch(() => {
            setLoading(false);
        });
    }
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
                            font-bold 
                            text-center 
                            mb-5
                        '
                    >
                        Register Here
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            name='name' 
                            onChange={handleChange}
                            placeholder="Enter Your Full Name" 
                            prefix={<FaRegUser className='mr-2' size={24} color="#0071E3"/>} 
                            style={{
                                border: "1px solid #0071E3",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                marginBottom: "20px",
                            }}
                            
                        />
                        <Input
                            name='email'
                            onChange={handleChange} 
                            placeholder="Enter Your Email" 
                            prefix={<HiOutlineMail className='mr-2' size={24} color="#0071E3" />} 
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
                                fontSize: "16px",
                                marginBottom: "20px",
                            }}
                        />
                        <button type='submit' className='w-full bg-[#0071E3] h-[46px] text-white font-medium rounded-lg'>Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register