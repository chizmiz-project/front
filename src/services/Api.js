import Cookies from "js-cookie";

const ApiService = (() => {
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

  const getCsrfToken = () => Cookies.get("csrftoken");

  const handleResponse = async (response) => {
    const data = await response.json().catch(() => null);
    return {
      status: response.status,
      isSuccess: response.ok,
      isBadRequest: response.status === 400,
      isNotFound: response.status === 404,
      isServerError: response.status >= 500 && response.status < 600,
      data,
    };
  };

  const handleError = (error) => {
    console.error("API Request Error:", error);
    throw new Error("Network error or server is unreachable.");
  };

  const get = async (endpoint, options = {}) => {
    try {
      const urlParams = new URLSearchParams(options);
      const response = await fetch(
        `${BASE_URL}${endpoint}?${urlParams.toString()}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  const post = async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  const uploadFile = async file => {
    const formData = new FormData()
    formData.append("file", file)

    const csrfToken = getCsrfToken();

    const response = await fetch(`${BASE_URL}${'/file/picture'}`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken
      },
      credentials: "include",
      body: formData
    })

    console.log(response)

    return handleResponse(response);
  }

  const put = async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  const del = async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        credentials: "include",
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  return { get, post, put, delete: del, uploadFile };
})();

export default ApiService;
