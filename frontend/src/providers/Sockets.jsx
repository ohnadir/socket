import React, { useMemo, useContext } from 'react'
import { io } from "socket.io-client"
const SocketContext = React.createContext(null);

export const useSocket= ()=>{ 
    return useContext(SocketContext)
}

export const SocketProvider = (props)=>{
    const socket = useMemo(()=> io("http://localhost:8080", { withCredentials: true }), []);
    return(
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}