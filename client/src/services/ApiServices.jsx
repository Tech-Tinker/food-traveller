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
        const response = await axios.post(`${endpoint}/recipe`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateRecipe(id, data) {
    try {
        const response = await axios.post(`${endpoint}/recipe/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
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

export async function getProfile() {
    try {
        const response = await axios.get(`${endpoint}/profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateProfile(data) {
    try {
        const response = await axios.post(`${endpoint}/edit-profile`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function searchService(query) {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get(`${endpoint}/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

export async function saveRatingService(rating, comment) {
   const token = localStorage.getItem("token");
   try {
     const response = await axios.post(
       `${endpoint}/recipe_reviews`,
       { rating, comment },
       {
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       }
    );
    return response.data;
    } catch (error) {
      throw error;
    }
}