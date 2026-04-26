import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Use environment variable for API URL in production, or fallback to relative path
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/auth/user');
            setUser(res.data);
        } catch (err) {
            console.error('Failed to fetch user', err);
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const signup = async (name, email, password) => {
        const res = await axios.post('/api/auth/signup', { name, email, password });
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
