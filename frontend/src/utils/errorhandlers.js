
export const handleApiError = (error) => {
    if (error.response) {
      console.error('Server responded with error:', error.response.data);
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('Network error - no response from server');
    } else {
      console.error('Request setup error:', error.message);
      throw new Error('Error setting up request');
    }
  };
  
