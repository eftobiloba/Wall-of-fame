import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ApiClient = {

  getCurrentUser: async (auth, token) => {
    if (!auth) throw new Error("Not authenticated");

    try {
      const response = await axios.get(`${API_URL}/auth/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  },

  getWallOfFame: async (auth, token, userId) => {
    if (!auth) throw new Error("Not authenticated");

    try {
      const response = await axios.get(`${API_URL}/wall-of-fame/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export default ApiClient;
