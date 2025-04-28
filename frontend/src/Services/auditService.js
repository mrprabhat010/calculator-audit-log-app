import axios from 'axios';

const API_BASE_URL =  'http://localhost:8000/api';

const auditService = {
  logAction: async (actionData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/audit`, actionData);
      return response.data;
    } catch (error) {
      console.error('Error logging action:', error);
      throw error;
    }
  },
};

export default auditService;