import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import Loading from './Loading';

function NAuth({ children }) {
    const { authUser, loading } = useContext(AuthContext);
    const { authLastPage } = useContext(LocationContext)
    if (loading) {
        return <Loading />
    } else {

        return authUser ? (
            <Navigate to={authLastPage} />
        ) : (
            <div>{children}</div>
        );
    }
}

export default NAuth;
