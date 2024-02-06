import React from 'react'
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import User from '../utils/Users.json'
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useMemo } from 'react';
import { useNavigate } from "react-router-dom";

const GroupChat = () => {
    const socket = useMemo(() => io("http://localhost:8080", { withCredentials: true }),[]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    // const filterUsers = users.filter(item => item.userId !== user._id);

    const navigate = useNavigate()
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [typedMessage, setTypedMessage] = useState('')
    const [room, setRoom] = useState('');

    useEffect(()=>{
        if(!user?._id){
            return navigate('/login')
        }
    }, [user?._id])

    
    const handleSubmit = () => {
        if(room){
            socket.emit('groupMessage', { room, message,  userId: user?._id});
            setMessage('');
        }else{
            alert("Select Room")
        }
    };
    
    // implement how to right for my text;
    useEffect(() => {

        socket?.emit('addUser', user?._id);
        // Join default room on mount
        socket.emit('joinRoom', room);

        // Listen for incoming messages
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
        // Leave room on unmount
        socket.emit('leaveRoom', room);

        };
  }, [room]);

    return (
        <div 
            className='
                max-w-screen-xl 
                mx-auto 
                p-4 
            '
        >
            <h1 className='text-[#0071E3] text-3xl text-center my-2'>One to Group Conversation</h1>
            <div
                className='
                    flex 
                    justify-between 
                    gap-6
                '
            >
                <div 
                    className='
                        w-[25%] 
                        h-fit 
                        border 
                        rounded-lg 
                        py-5
                    '
                >
                    <h1 className='text-center mb-2'>Profile</h1>
                    <div className='ml-3'>
                        <div className='flex items-center justify-start gap-3'>
                            <img className='rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU" width={50} height={50} alt="" />
                            <div>
                                <h1 className='m-0 p-0 font-bold'>{user?.name}</h1>
                                <h1 className='m-0 p-0 font-normal'>{user?.email}</h1>
                            </div>
                        </div>
                    </div>
                </div>


                <div 
                    className='
                        w-[50%] 
                        h-[82vh] 
                        relative 
                        border 
                        rounded-lg 
                    '
                >
                    <div className='w-full'>
                        <h1 className='text-center border py-2 '>Mesagges</h1>
                    </div>
                    <div className='grid grid-cols-1 gap-2 p-2'>
                        {
                            messages?.map((item, index)=>
                                <div 
                                    key={index} 
                                    className={`
                                        flex 
                                        ${item?.userId === user?._id ? "items-end justify-end" : " items-start justify-start" }
                                    `}
                                >
                                    <p 
                                        className={`
                                            
                                            rounded-sm
                                            ${item?.userId === user?._id ? "bg-[#0071E3] text-white" : " bg-slate-300 " } 
                                            p-1 
                                            w-fit 
                                            text-right
                                        `}
                                    >
                                        {item?.message}
                                    </p>
                                </div> 
                            )
                        }
                    </div>
                    <div className='flex w-full items-center gap-2 absolute left-0 bottom-0 p-2'>
                        <textarea 
                            value={message} 
                            onChange={(e)=>setMessage(e.target.value)} 
                            name="" 
                            className='w-full  border outline-none rounded-lg p-1' 
                            id=""  
                            rows="2">
                        </textarea>
                        <button 
                            onClick={handleSubmit} 
                            className='
                                border 
                                w-24 
                                font-semibold 
                                text-[18px] 
                                h-[54px] 
                                text-white 
                                rounded-lg 
                                bg-[#0071E3]
                            '
                        >
                            Send
                        </button>
                    </div>
                </div>


                {/* // ${users.length > 11 ? "overflow-y-scroll" : null}  */}
                <div 
                    className={`
                        w-[25%] 
                        h-[82vh] 
                        border 
                        rounded-lg  
                        gap-4 
                        pt-5 
                        px-4
                    `}
                >
                    <button 
                        onClick={()=>setRoom("SMT")} 
                        className={`

                            ${room === "SMT" ? "bg-[#0071E3] text-white" : "bg-white border border-[#0071E3] text-[#0071E3]"}
                            rounded-lg 
                            py-2 
                            w-full 
                            mb-2 
                            font-medium 
                            text-xl
                        `}>
                            SMT
                    </button>

                    <button 
                        onClick={()=>setRoom("Sparktech")} 
                        className={`
                            ${room === "Sparktech" ? "bg-[#0071E3] text-white" : "bg-white border border-[#0071E3]  text-[#0071E3]"}
                            rounded-lg 
                            py-2 
                            w-full 
                            mb-2 
                            font-medium 
                            text-xl
                        `}>
                            Sparktech
                    </button>
                    <button 
                        onClick={()=>setRoom("Softdence")} 
                        className={`
                            ${room === "Softdence" ? "bg-[#0071E3] text-white" : "bg-white border border-[#0071E3]  text-[#0071E3]"}
                            rounded-lg 
                            py-2 
                            w-full 
                            mb-2 
                            font-medium 
                            text-xl
                        `}>
                            Softdence
                    </button>
                    {/* {
                        filterUsers?.map((item, index) => 
                            <div 
                                key={index} 
                                onClick={()=>setRoom(item?.socketId)} 
                                className={`
                                    flex 
                                    items-center 
                                    gap-3 
                                    mb-2 
                                    border 
                                    rounded-lg 
                                    p-1 
                                    hover:border-[#0071E3]
                                    ${room === item?.socketId ? "border-[#0071E3]" : null}
                                `}  
                            >   
                                <img className='rounded-full'  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-JmDfLz7ErRiTZ9vIme55A9JGQqdx8qJ_xQ_lB2UIqGAFELpsKQQ8xuTSrlqrly-tSQ&usqp=CAU" width={50} height={50} />
                                
                                <div className='overflow-hidden'>
                                    <h1 className='m-0 p-0 font-semibold'>{item?.user?.name}</h1>
                                </div>
                            </div>
                        )
                    } */}
                </div>
            </div>
        </div>
    )
}

export default GroupChat