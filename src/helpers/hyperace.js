import axios from 'axios';

export async function hyperaceGet(endpoint, signal) {
    const url = `${import.meta.env.VITE_HYPERACE_BASE_URL}${endpoint}`;

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
        console.error(`HyperAce GET fout (${endpoint})`, error);

        return {items: []};
    }
}