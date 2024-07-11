import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const PublicClient = {

  getCurrentUser: async (username) => {

    try {
      const response = await axios.get(`${API_URL}/users/one/${username}`);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  },

  getWallOfFame: async (username) => {

    try {
      const response = await axios.get(`${API_URL}/wall-of-fame/${username}`);
      
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export default PublicClient;
