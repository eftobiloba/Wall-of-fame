import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../App';
import Cookies from 'js-cookie';

const Logout = () => {
    const { setAuth } = useContext(AuthApi);
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout operations
        setAuth(false);
        Cookies.remove('login_credentials');

        // Redirect to login page
        navigate('/login', { replace: true });
    }, [setAuth, navigate]);

    // Optionally, render a message or a spinner while logging out
    return (
        <div>Logging out...</div>
    );
};

export default Logout;