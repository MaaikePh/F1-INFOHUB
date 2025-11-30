import {createContext, useEffect, useState} from 'react';
import api, {createPreferences, getPreferenceByUserId, getUserByEmail, loginUser} from '../helpers/api.js';
import {normalize} from '../helpers/normalizer.js';
import driverstats from '../constants/driver-stats.json';
import {isTokenValid} from '../helpers/isTokenValid.js';

export const AuthContext = createContext();

function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [favoriteTeam, setFavoriteTeam] = useState(localStorage.getItem('favoriteTeam') || '');
    const [favoriteDriver, setFavoriteDriver] = useState(localStorage.getItem('favoriteDriver') || '');

    const teams = [
        ...new Map(driverstats.map((d) => [d.team.key, d.team]))
    ].map(([, team]) => team);

    useEffect(() => {
        const timer = setTimeout(() => {
            const storedToken = localStorage.getItem('token');

            if (storedToken && isTokenValid(storedToken)) {
                setToken(storedToken);
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('token');
                setToken(null);
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

            localStorage.setItem('token', result.token);
            setToken(result.token);

            const profile = await getUserByEmail(email);
            const prefs = await getPreferenceByUserId(profile.id);

            const favDriver = prefs?.favoriteDriver || '';
            const favTeamKey =
                teams.find((t) => normalize(t.name) === normalize(prefs?.favoriteTeam))?.key || '';

            localStorage.setItem('favoriteTeam', favTeamKey);
            localStorage.setItem('favoriteDriver', favDriver);

            setFavoriteTeam(favTeamKey);
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

    async function updateFavorites({favoriteTeam, favoriteDriver}) {
        if (!user) return;

        setLoading(true);

        try {
            const existing = await getPreferenceByUserId(user.id);
            let prefs;

            if (existing) {
                const response = await api.patch(`/userPreferences/${existing.id}`, {
                    favoriteTeam,
                    favoriteDriver
                })
                prefs = response.data;
            } else {
                prefs = await createPreferences({
                    userId: user.id,
                    favoriteTeam,
                    favoriteDriver
                });
            }

            setFavoriteTeam(prefs.favoriteTeam);
            setFavoriteDriver(prefs.favoriteDriver);

            localStorage.setItem('favoriteTeam', prefs.favoriteTeam);
            localStorage.setItem('favoriteDriver', prefs.favoriteDriver);

            return true;
        } catch (error) {
            console.error('Update van voorkeuren mislukt', error);
            return false;
        } finally {
            setLoading(false);
        }
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
        updateFavorites
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;