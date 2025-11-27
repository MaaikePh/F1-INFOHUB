import axios from 'axios';

export async function hyperaceGet(endpoint) {
    const url = `${import.meta.env.VITE_HYPERACE_BASE_URL}${endpoint}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_HYPERACE_API_KEY,
                'x-rapidapi-host': import.meta.env.VITE_HYPERACE_HOST,
            }
        });

        return response.data;
    } catch (error) {
        console.error(`HyperAce GET ging fout (${endpoint})`, error);
        throw error;
    }
}