import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Input } from 'antd';
import { HiOutlineMail } from "react-icons/hi";
import { FaRestroom } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSocket } from '../providers/Sockets';
const WebRTC = () => {
    const socket = useSocket();
    const peer = useMemo(()=> new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478"
                ],
            }
        ]
    }), []);

    const createOffer = async() =>{
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }


    const [auth, setAuth] = useState();
    const navigate = useNavigate()
    const handleChange=(e)=>{
        setAuth(prev=>({...prev,  [e.target.name]: e.target.value}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        socket?.emit('join-room', {emailId: auth?.email, roomId: auth?.room});
    }

    const handleRoomJoined =useCallback( ({roomId})=>{
        navigate(`/room/${roomId}`)
    }, [navigate])
    
    useEffect(() => {
        socket.on('joined-room', data=>{ 
            handleRoomJoined(data)
        } );

        return ()=>{
            socket.off("joined-room", data=>{ 
                handleRoomJoined(data)
            });
        }
    }, [socket]);

    return (
        <div 
            className='
                max-w-7xl 
                mx-auto 
                py-10 
                px-6
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
                    mx-auto 
                    border
                    rounded-xl
                '
            >
                <form className='grid grid-cols-1 gap-5' onSubmit={handleSubmit}>
                    <h1 
                        className='
                            text-2xl 
                            text-[#0071E3] 
                            mb-5 
                            font-bold 
                            text-center
                        '
                    >
                        One to One 
                    </h1>
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
                        }}
                    />
                    <Input
                        name='room'
                        onChange={handleChange} 
                        placeholder="Enter Your Room" 
                        prefix={<FaRestroom className='mr-2' size={24} color="#0071E3" />} 
                        style={{
                            border: "1px solid #0071E3",
                            height: "52px",
                            background: "white",
                            borderRadius: "8px",
                            outline: "none",
                        }}
                    />
                    <button type='submit' className='w-full bg-[#0071E3] h-[46px] text-white font-medium rounded-lg'>Enter</button>
                </form>
            </div>
        </div>
    )
}

export default WebRTC;