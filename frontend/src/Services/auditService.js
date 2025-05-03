import axios from 'axios';
import { handleApiError } from '../utils/errorhandlers';
import {v4 as uuid} from 'uuid';

const API_BASE_URL =  "http://localhost:8000/api" || process.env.REACT_APP_API_BASE_URL;

export const logAction = async (action,value) => {

  try {
    const actionData = {
      id: uuid(),
      timestamp: Math.floor(Date.now() / 1000),
      action,
      value: String(value)
    };
    const response = await axios.post(`${API_BASE_URL}/audit`, actionData, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
