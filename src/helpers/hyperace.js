import axios from 'axios';

// SAFE MODE CONFIG
let apiCallCounter = 0;
const API_CALL_LIMIT = 10;

const hyperaceMock = {
    "/v2/grands-prix?seasonYear=2025&pageSize=25": {
        items: []
    }
};


export async function hyperaceGet(endpoint, signal) {
    if (apiCallCounter >= API_CALL_LIMIT) {
        console.warn(`🔒 Hyperace SAFE MODE active — using mock for: ${endpoint}`);

        if (hyperaceMock[endpoint]) {
            return hyperaceMock[endpoint];
        }

        return { items: [] };
    }


    const url = `${import.meta.env.VITE_HYPERACE_BASE_URL}${endpoint}`;

    apiCallCounter++;
    console.log(`📡 Hyperace API-call #${apiCallCounter}: ${url}`);

    try {
        const response = await axios.get(url, {
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_HYPERACE_API_KEY,
                'x-rapidapi-host': import.meta.env.VITE_HYPERACE_HOST,
            },
            signal: signal,
        });

        return response.data;
    } catch (error) {
        console.error(`HyperAce GET ging fout (${endpoint})`, error);

        return { items: [] };
    }
}