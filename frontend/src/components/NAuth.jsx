import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function NAuth({ children }) {
    const { authUser } = useContext(AuthContext);

    return authUser ? (
        <Navigate to="/" />
    ) : (
        <div>{children}</div>
    );
}

export default NAuth;
