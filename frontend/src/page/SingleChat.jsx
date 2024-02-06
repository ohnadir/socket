import React from 'react'
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import User from '../utils/Users.json'
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useMemo } from 'react';
import { useNavigate } from "react-router-dom";

const SingleChat = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const navigate = useNavigate()
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socketID, setSocketId] = useState([]);
    
    useEffect(()=>{
        if(!user?._id){
            return navigate('/login')
        }
    }, [user?._id])

    const socket = useMemo(() => io("http://localhost:8080", {
        withCredentials: true,
      }),[]);
    
    const handleSubmit = () => {
        socket.emit("chat-message", message);
    };
    useEffect(() => {
        socket?.emit('addUser', user?._id);
		socket?.on('getUsers', users => {
			console.log('activeUsers :>> ', users);
		})
    }, []);
    return (
        <div className='max-w-screen-xl mx-auto p-4 flex justify-between gap-6'>
            <div className='w-[25%] h-fit border rounded-lg py-5'>
                <h1 className='text-center mb-2'>Profile</h1>
                <div>
                    <div className='flex items-center justify-center gap-3'>
                        <FaUserCircle size={30} />
                        <div>
                            <h1 className='m-0 p-0 font-semibold'>test user</h1>
                            <h1 className='m-0 p-0'>test@gmail.com</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className='w-[50%] h-[88vh] relative border rounded-lg '>
                <div className='w-full'>
                    <h1 className='text-center border py-2 '>Mesagges</h1>
                </div>
                <div className='grid grid-cols-1 gap-2 p-2'>
                    {
                        messages?.map((message, index)=> 
                            <p className='bg-slate-300 rounded-sm p-1' key={index}>{message}</p>
                        )
                    }
                </div>
                <div className='flex w-full items-center gap-2 absolute left-0 bottom-0 p-2'>
                    <textarea value={message} onChange={(e)=>setMessage(e.target.value)} name="" className='w-full  border outline-none rounded-lg p-1' id=""  rows="2"></textarea>
                    <button onClick={handleSubmit} className='border w-20 rounded-lg bg-teal-300'>Send</button>
                </div>
            </div>



            <div className={`w-[25%] h-[88vh] ${socketID.length > 11 ? "overflow-y-scroll" : null} border rounded-lg  gap-4 pt-5 px-4`}>
                {
                    socketID?.map((item, index) => 
                        <div key={index} onClick={()=>setRoom(item)} className='flex items-center gap-3 mb-2 border p-1 hover:border-cyan-300'>
                            <FaUserCircle size={30} />
                            <div>
                                <h1 className='m-0 p-0 font-semibold'>Users {index}</h1>
                                <h1 className='m-0 p-0'>user{index}@gmail.com</h1>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SingleChat