import axios from 'axios';

const endpoint = 'http://localhost:8000/api';

export async function getAllRecipes() {
    const response = await axios.get(`${endpoint}/recipes`);
    return response.data;
}

export async function getRecipeById(id) {
    try {
        const response = await axios.get(`${endpoint}/recipe/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function storeRecipe(data) {
    try {
        const response = await axios.post(`${endpoint}/recipe`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateRecipe(id, data) {
    try {
        const response = await axios.put(`${endpoint}/recipe/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteRecipe(id) {
    try {
        await axios.delete(`${endpoint}/recipe/${id}`);
    } catch (error) {
        throw error;
    }
}

export async function getUserProfile() {
    try {
        const response = await axios.get(`${endpoint}/profile`, data);
        return response.data.user;
    } catch (error) {
        throw error;
    }
}

export async function updateProfile(id, data) {
    try {
        const response = await axios.put(`${endpoint}/edit-profile`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
