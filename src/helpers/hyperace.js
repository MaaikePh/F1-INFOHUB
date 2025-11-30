import axios from 'axios';

// SAFE MODE CONFIG
let errorCounter = 0;
const ERROR_LIMIT = 10;
const FORCE_NO_API = true;

const hyperaceMock = {
    '/v2/grands-prix?seasonYear=2025&pageSize=25': {
        items: []
    }
};


export async function hyperaceGet(endpoint, signal) {
    if (FORCE_NO_API) {
        console.warn(`API volledig uitgeschakeld (dev mode) → ${endpoint}`);
        return {items: []};
    }

    if (errorCounter >= ERROR_LIMIT) {
        console.warn(`Hyperace SAFE MODE active — using mock for: ${endpoint}`);

        if (hyperaceMock[endpoint]) {
            return hyperaceMock[endpoint];
        }

        return {items: []};
    }

    const url = `${import.meta.env.VITE_HYPERACE_BASE_URL}${endpoint}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_HYPERACE_API_KEY,
                'x-rapidapi-host': import.meta.env.VITE_HYPERACE_HOST,
            },
            signal: signal,
        });

        errorCounter = 0;

        return response.data;

    } catch (error) {
        console.error(`HyperAce GET fout (${endpoint})`, error);

        errorCounter++;

        return {items: []};
    }
}