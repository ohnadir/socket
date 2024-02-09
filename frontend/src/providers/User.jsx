import React, { useContext, useEffect, useState } from 'react';
import { useLoadUserQuery } from '../Redux/slice/anotherAuthSlice';
export  const UserContext = React.createContext(null);

export const useUser= ()=>{
    return useContext(UserContext)
}

export const UserProvider = (props)=>{
    const { data: users, isLoading} = useLoadUserQuery();
    const [user, setUser] = useState(null);
    useEffect(()=>{
        setUser(users?.user)
    }, [users?.user])
    if (isLoading) {
        return <p>Loading user data...</p>;
    }
    console.log(user)
    return(
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}