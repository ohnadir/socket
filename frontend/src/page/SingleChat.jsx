import React, { useContext } from 'react'
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import User from '../utils/Users.json'
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoadUserQuery } from '../Redux/slice/anotherAuthSlice';
import { UserContext, useUser } from '../providers/User';

const SingleChat = () => {
    const user = useUser()
    // const user = useContext(UserContext);
    // const { user } = useUser() || {};
    // const { data: user} = useLoadUserQuery();
    console.log(user)
    const navigate = useNavigate()
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [allMessages, setAllMessages]=useState([]);
    const filterUsers = users.filter(item => item.userId !== user._id);
    const [room, setRoom] = useState();

    /* useEffect(()=>{
        if(!user?user._id){
            return navigate('/login')
        }
    }, [user?._id]) */

    const socket = useMemo(() => io("http://localhost:8080", { withCredentials: true }),[]);
    
    const handleSubmit = () => {
        if(room){
            socket?.emit('sendMessage', {
                receiverId: room,
                message,
                userId: user?._id
            });
            setMessage("")
        }else{
            alert("Select Room")
        }
    };

    if(user?._id){
        useEffect(() => {
            socket?.emit('addUser', user?._id);
            socket?.on('getUsers', users => {
                setUsers(users)
            })
            socket?.on('receive-message', data => {
                setAllMessages(prevMessages => [...prevMessages, data])
            })
        }, []);
    }

    return (
        <div 
            className='
                max-w-screen-xl 
                mx-auto 
                p-4 
            '
        >
            <h1 className='text-[#0071E3] text-3xl text-center my-2'>One to One Conversation</h1>
            <div
                className='
                    flex 
                    justify-between 
                    gap-6
                '
            >
                {/* login user profile */}
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

                {/* input field container */}
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
                            allMessages?.map((item, index)=>
                                <div key={index}>
                                    <p className='bg-slate-300 rounded-sm p-1'>{item.message}</p>
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


                {/* others user */}
                <div 
                    className={`
                        w-[25%] 
                        h-[82vh] 
                        ${users.length > 11 ? "overflow-y-scroll" : null} 
                        border 
                        rounded-lg  
                        gap-4 
                        pt-5 
                        px-4
                    `}
                >
                    {
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
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleChat