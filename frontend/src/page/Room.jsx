import React, { useEffect, useMemo, useCallback } from 'react';
import { useSocket } from '../providers/Sockets';
import ReactPlayer from "react-player"

const Room = () => {
    const [myStream, setMyStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
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
    const createAnswer = async(offer) =>{
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }
    const setRemoteAnswer = async(ans) =>{
        await peer.setRemoteDescription(ans);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }

    const sendStream = async(stream)=>{
        const tracks = stream.getTracks();
        for(const track of tracks){
            peer.addTrack(track, stream);
        }
    }

    const handleNewUserJoined = useCallback ( async (data) =>{
        const { emailId } = data;
        const offer = await createOffer();
        socket.emit('call-user', {emailId, offer: offer})
    }, [createOffer, socket]);

    const handleIncomingCall = useCallback( async (data)=>{
        const { from, offer } = data;
        console.log("income call from", from, offer);
        const ans =  await  createAnswer(offer);
        socket.emit( 'call-accepted' , { emailId : from ,  ans});
    }, [createAnswer, socket]);

    const handleCallAccepted = useCallback( async (data)=>{
        const { ans } = data;
        await setRemoteAnswer(ans);
        sendStream(myStream);
    }, [myStream, sendStream, setRemoteAnswer])

    const getUserMediaStream = useCallback(async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio:true });
        setMyStream(stream);
    }, []);
    const handleTrackEvent = useCallback(async(ev)=>{
        const streams= ev.streams;
        setRemoteStream(streams[0]);
    }, [])

    useEffect(() => {
        socket.on('user-joined', data=>{handleNewUserJoined(data)});
        socket.on("join-room", data=>{ handleNewUserJoined(data)});
        socket.on("incoming-call", data=>{handleIncomingCall(data)});
        socket.on("call-accepted", data=>{handleCallAccepted(data)});

        peer.addEventListener('track', ev =>handleTrackEvent(ev))


        return () =>{
            socket.off("user-joined", data=> handleNewUserJoined(data));
            socket.off("incoming-call", data=> handleIncomingCall(data));
            socket.off("call-accepted", data=> handleCallAccepted(data));
            peer.removeEventListener('track', ev=> handleTrackEvent(ev));
        }

    }, [handleCallAccepted, handleIncomingCall, handleNewUserJoined, socket, peer ]);


    useEffect(()=>{
        getUserMediaStream()
    }, [getUserMediaStream]);

    return (
        <div>
            <div>
                <ReactPlayer url={myStream} playing />
                <ReactPlayer url={remoteStream} playing />
            </div>
        </div>
    )
}

export default Room