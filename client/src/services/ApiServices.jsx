import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

export async function storeRecipe(data) {
    try {
        const response = await axios.post(`${endpoint}/create`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}