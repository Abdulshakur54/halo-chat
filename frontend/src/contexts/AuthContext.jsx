import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // function to handle socket connection and get online users
    const connectSocket = (userId) => {
        if (!socket) {
            const newSocket = io(backendUrl, { query: { userId } });
            setSocket(newSocket);

            newSocket.on("onlineUsers", (users) => {
                setOnlineUsers(users);
            });
        }
    };

    const api = axios.create({
        baseURL: backendUrl,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        timeout: 10000,
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token"); // always read fresh
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // function to check authentication
    const getUser = async () => {
        try {
            const res = await api.get("/users/user");
            if (res.status === 200) {
                return res.data.data.user;
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return null;
        }
    };


 
    useEffect(() => {
        const init = async () => {
            if (token) {
                console.log('I ran because there is token')
                const user = await getUser();
                if (user) {
                    setAuthUser(user);
                    connectSocket(user._id);
                }
            } else {
                setAuthUser(null);
            }
        };
        init();
    }, [token]); // runs again if token changes

    const value = {
        api,
        authUser,
        setToken,
        onlineUsers,
        socket,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
