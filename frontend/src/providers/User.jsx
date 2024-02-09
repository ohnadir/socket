import React, { useContext } from 'react';
import { useLoadUserQuery } from '../Redux/slice/anotherAuthSlice';
export  const UserContext = React.createContext(null);

export const useUser= ()=>{
    return useContext(UserContext)
}

export const UserProvider = (props)=>{
    const { data: users, isLoading} = useLoadUserQuery();
    if (isLoading) {
        return <p>Loading user data...</p>;
    }
    return(
        <UserContext.Provider value={users?.user}>
            {props.children}
        </UserContext.Provider>
    )
}