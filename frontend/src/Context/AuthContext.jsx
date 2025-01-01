/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { checkAuth, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);

    const updateAuthenticity = async () => {
        const response = await checkAuth();
        setAuthUser(() => (response));
    };
    const logoutUser = async () => {
        await logout()
        localStorage.removeItem("token")
        setAuthUser(() => (null));
    };

    return (
        <AuthContext.Provider value={{ authUser, updateAuthenticity, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.fragment
    ]).isRequired
};