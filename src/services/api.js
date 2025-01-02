const ApiService = (() => {

  let BASE_URL = 'http://localhost:8000/api';

  // Handle response and standardize the output 
  const handleResponse = async (response) => {
    const data = await response.json().catch(() => null);

    return {
      status: response.status,
      isSuccess: response.ok,
      isBadRequest: response.status === 400,
      isNotFound: response.status === 404,
      isServerError: response.status >= 500 && response.status < 600,
      data
    };
  };

  // GET method
  const get = async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
      return handleResponse(response);
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  };


  // POST method 
  const post = async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }
      );
      return handleResponse(response);
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  };

  // PUT method 
  const put = async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        });

      return handleResponse(response);
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  };

  // DELETE method 
  const del = async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`,
        {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
      return handleResponse(response);
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  };
  return { get, post, put, delete: del };
})();

export default ApiService; 