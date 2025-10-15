import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { LocationContext } from '../contexts/LocationContext';

function Auth({ children }) {
    const { authUser, loading } = useContext(AuthContext);
    const { setAuthLastPage } = useContext(LocationContext)
    const location = useLocation()
    useEffect(() => {
        setAuthLastPage(location.pathname)
    })
    if (loading) {
        return <Loading />
    } else {

        return authUser ? (
            <div>{children}</div>

        ) : (
            <Navigate to="/login" />
        );
    }
}

export default Auth;
