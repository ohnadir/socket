import React, { useEffect, useMemo, useCallback } from 'react'
import { io } from "socket.io-client"

const Room = () => {
    const socket = useMemo(() => io("http://localhost:8080", { withCredentials: true }),[]);
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

    const handleNewUserJoined = useCallback ( async(data)=>{
        const { emailId } = data;
        console.log(emailId);
        const offer = await createOffer()
        socket.emit('call-user', emailId, offer)
    }, [createOffer, socket]);

    const handleIncommingCall = useCallback((data)=>{
        const { from, offer } = data;
        console.log("income call from", from, offer)
    }, [])

    useEffect(() => {

        socket.on('user-joined', data=>{ 
            console.log("user" + data)
            // handleNewUserJoined(data)
        })
        socket.on("join-room", data=>{ 
            console.log("room" + data )
            // handleNewUserJoined(data)
        })
        socket.on("incomming-call", data=>{
            console.log(data);
            handleIncommingCall(data);
        })

    }, [socket]);

    return (
        <div>Room</div>
    )
}

export default Room