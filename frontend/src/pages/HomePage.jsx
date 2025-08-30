import React, { useState, useContext } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import RightSideBar from '../components/RightSideBar'
import ChatContainer from '../components/ChatContainer'
import { AuthContext } from '../contexts/AuthContext'

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState(false)
    const {setToken, socket} = useContext(AuthContext)
       const logout = () => {
            localStorage.removeItem("token");
            setToken(null);
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        };
    

    return (
        <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
            <div className={`blackdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative 
            ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
                <LeftSideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                <RightSideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </div>
        </div>
    )
}

export default HomePage