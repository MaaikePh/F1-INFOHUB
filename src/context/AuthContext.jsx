import {createContext, useEffect, useState} from 'react';
import {loginUser} from '../helpers/api.js';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    async function login(email, password) {
        setLoading(true);
        setAuthError('');

        try {
            const result = await loginUser({email, password});

            localStorage.setItem('token', result.token);
            setToken(result.token);

            setUser({email});

            setIsAuthenticated(true);

            return true;

        } catch (error) {
            console.error('Login mislukt', error);
            setAuthError(error.response?.data?.message || 'Login mislukt');
            return false;
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }

    const value = {
        user,
        token,
        isAuthenticated,
        loading,
        authError,
        login,
        logout,
    };

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthContextProvider;