import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {toast} from '../lib/utils.js'

export const AuthContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true)
    // function to handle socket connection and get online users
    const connectSocket = (userId) => {
        if (socket?.connected) return;
        const newSocket = io(backendUrl, { query: { userId } });
        newSocket.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        });
        setSocket(newSocket);
    };

    const api = axios.create({
        baseURL: backendUrl,
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
            const res = await api.get("/api/v1/users/user");
            if (res.status === 200) {
                return res.data.data.user;
            }
        } catch (err) {
            console.log(err)
            return null;
        }
    };
    const checkAuth = async () => {
        if (token) {
            const user = await getUser();
            if (user) {
                connectSocket(user._id);
                setAuthUser(user)
            }
        } else {
            setAuthUser(null)
        }
        setLoading(false)


    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        toast.success('Logged out successfully')
    };

    const cleanUp = () => {
        if (socket) {
            socket.disconnect()
        }
        setOnlineUsers([])
        setSocket(null)
        setLoading(true)
    }

    useEffect(() => {
        checkAuth();
        return cleanUp
    }, [token]);

    const value = {
        api,
        authUser,
        setAuthUser,
        setToken,
        onlineUsers,
        logout,
        socket,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
