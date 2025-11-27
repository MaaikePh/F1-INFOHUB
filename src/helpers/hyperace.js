import axios from 'axios';

export async function hyperaceGet(endpoint, signal) {
    const url = `${import.meta.env.VITE_HYPERACE_BASE_URL}${endpoint}`;
    console.warn("⚠️ API CALL WOULD BE MADE HERE:", url);
// return mockData;  // tijdelijk uitschakelen
    throw new Error("API temporarily disabled during development");

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
        throw error;
    }
}