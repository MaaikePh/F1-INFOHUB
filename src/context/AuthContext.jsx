import {createContext, useEffect, useState} from 'react';
import {getUserByEmail, loginUser, getPreferenceByUserId} from '../helpers/api.js';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [favoriteTeam, setFavoriteTeam] = useState(localStorage.getItem('favoriteTeam') || '');
    const [favoriteDriver, setFavoriteDriver] = useState(localStorage.getItem('favoriteDriver') || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                setToken(storedToken);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }

            setLoading(false);
        }, 600);

        return () => clearTimeout(timer);

    }, []);

    async function login(email, password) {
        setLoading(true);
        setAuthError('');

        try {
            const result = await loginUser({email, password});
            const profile = await getUserByEmail(email);
            const prefs = await getPreferenceByUserId(profile.id);

            const favTeam = prefs?.favoriteTeam || '';
            const favDriver = prefs?.favoriteDriver || '';


            localStorage.setItem('token', result.token);
            localStorage.setItem('favoriteTeam', favTeam);
            localStorage.setItem('favoriteDriver', favDriver);

            setToken(result.token);
            setFavoriteTeam(favTeam);
            setFavoriteDriver(favDriver);
            setUser(profile);

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
        localStorage.removeItem('favoriteTeam');
        localStorage.removeItem('favoriteDriver');

        setToken(null);
        setUser(null);
        setFavoriteTeam('');
        setFavoriteDriver('');
        setIsAuthenticated(false);
    }

    const value = {
        user,
        token,
        favoriteTeam,
        favoriteDriver,
        isAuthenticated,
        loading,
        authError,
        login,
        logout,
        setFavoriteTeam,
        setFavoriteDriver,
    };

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthContextProvider;