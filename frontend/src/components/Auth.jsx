import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function Auth({ children }) {
    const { authUser } = useContext(AuthContext);

    return authUser ? (
        <div>{children}</div>

    ) : (
        <Navigate to="/login" />
    );
}

export default Auth;
