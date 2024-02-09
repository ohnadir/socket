import React, { useState, useEffect, useContext } from 'react'
import { Input, message } from 'antd';
import {  FaRegUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { Link, useNavigate, } from "react-router-dom"
import { useRegisterMutation } from '../Redux/slice/anotherAuthSlice';
import Cookies from 'js-cookie';
import { UserContext } from '../providers/User';
const Register = () => {
    const [auth, setAuth] = useState();
    const { setUser } = useContext(UserContext);
    const [ register, { isLoading, isError, data: user, error} ]= useRegisterMutation();

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const handleChange=(e)=>{
        setAuth(prev=>({...prev,  [e.target.name]: e.target.value}))
    }

    if(user?.token){
        Cookies.set('token', (user?.token), { expires: 7 });
        setUser(user?.user)
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(auth);
        register(auth);
    }

    useEffect(()=>{
        if(user?.user?._id){
            messageApi.success("Register Successful")
            setTimeout(()=> {
                navigate("/");
            }, 1000);
        }
    }, [user?.user?._id]);

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
                        <button type='submit' className='w-full mb-5 bg-[#0071E3] h-[46px] text-white font-medium rounded-lg'>Register</button>
                        <Link to="/login">
                            <h4 className='text-[#0071E3] font-semibold text-right'>Already Have account? Login</h4>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register