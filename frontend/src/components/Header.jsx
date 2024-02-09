import React from 'react'
import { FaUser, FaUsers  } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Header = () => {
    const navigate = useNavigate()
    const handleLogout=()=>{
        navigate('/login', { replace: true })
    }
    return (
        <div className="bg-[#0071E3] p-4  text-white">
            <div className="max-w-screen-xl mx-auto ">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <h1 className='font-semibold text-2xl'>Chat Application</h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/single">
                            <FaUser  size={25}/>
                        </Link>
                        <Link to="/group">
                            <FaUsers  size={30} />
                        </Link>
                        <MdOutlineLogout onClick={handleLogout} className="cursor-pointer" size={30} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header