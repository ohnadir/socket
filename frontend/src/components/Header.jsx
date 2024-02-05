import React from 'react'
import { FaUser, FaUsers  } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className="max-w-screen-xl mx-auto p-4 bg-cyan-700 text-white">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <h1>Chat Application</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/single">
                        <FaUser className="cursor-pointer" size={25}/>
                    </Link>
                    <Link to="/group">
                        <FaUsers className="cursor-pointer" size={30} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header