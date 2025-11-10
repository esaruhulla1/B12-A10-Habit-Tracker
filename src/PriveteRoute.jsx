// Routes/PriveteRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './Context/AuthContext';

const PriveteRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <span className="loading loading-spinner text-success"></span>;
    }

    if(user) {
        return children;
    }

    return <Navigate state={location.pathname} to='/login' />;
};

export default PriveteRoute;
