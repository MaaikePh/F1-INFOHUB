import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_DYNAMICS_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'novi-education-project-id': import.meta.env.VITE_DYNAMICS_API_KEY,
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

export async function registerUser(formData) {
    try {
        const response = await api.post('/users', formData);
        return response.data;
    } catch (error) {
        console.error('Registratie mislukt: ', error);
        throw error;
    }
}

export async function emailExists(email) {
    try {
        const response = await api.get('/users');
        return response.data.some(user => user.email === email);
    } catch (error) {
        console.error('Email check mislukt:', error);
        throw error;
    }
}

export async function createPreferences(data) {
    try {
        const response = await api.post('/userPreferences', data);
        return response.data;
    } catch (error) {
        console.error('Aanmaak voorkeuren mislukt: ', error);
        throw error;
    }
}

export async function getPreferenceByUserId(userId) {
    try {
        const response = await api.get('/userPreferences');
        return response.data.find(p => p.userId === userId);
    } catch (error) {
        console.error('Ophalen voorkeuren mislukt: ', error);
        throw error;
    }
}

export async function getUserByEmail(email) {
    const response = await api.get(`/users`);
    return response.data.find(user => user.email === email);
}

export async function loginUser(credentials) {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login mislukt: ', error);
        throw error;
    }
}

export default api;