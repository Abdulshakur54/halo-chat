import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from '../lib/utils.js'
export const ChatContext = createContext()
export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})
    const { socket, api } = useContext(AuthContext)

    //get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await api.get('/api/v1/messages/users')
            if (data.success) {
                setUsers(data.data.users)
                setUnseenMessages(data.data.unseenMessages)
            }
        } catch (err) {
            toast.error(err.response.data.message || err.message)
        }
    }
    // get messages from selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await api.get(`/api/v1/messages/${userId}`)
            if (data.success) {
                setMessages(data.data.messages)
            }
        } catch (err) {
            toast.error(err.response.data.message || err.message)
        }
    }

    //function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await api.post(`/api/v1/messages/send/${selectedUser._id}`, messageData)
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.data.message])
            }
        } catch (err) {
            console.log('error: ', err)
            toast.error(err.response.data.message || err.message)
        }
    }

    //function to mark messages as seen

    const markMessagesAsSeen = async (user) => {
        try {
            setSelectedUser(user);
            await api.put(`/api/v1/messages/marks/${user._id}`)
            setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }))
        }
        catch (err) {
            toast.error(err.response.data.message || err.message)
        }

    }

    // function to subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if (!socket) return;
        socket.on('newMessage', (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true
                setMessages((prevMessages) => [...prevMessages, newMessage])
                api.put(`/api/v1/messages/mark/${newMessage._id}`)
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages, [newMessage.senderId]:
                        prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        })
    }

    //function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if (socket) socket.off("newMessage")
    }
    useEffect(() => {
        subscribeToMessages()
        return () => unsubscribeFromMessages();
    }, [socket, selectedUser])
    const value = {
        messages, users, selectedUser, getUsers, getMessages, sendMessage, setSelectedUser, unseenMessages, setUnseenMessages, markMessagesAsSeen
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}