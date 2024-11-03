import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const AUTH_REFRESH_URL = BASE_URL + '/auth/refresh-token';

/**
 * Creates and returns an axios instance with predefined configuration.
 * @returns {AxiosInstance} Configured axios instance
 */
const createApiInstance = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Accept': 'application/json'
        }
    });
};

const api = createApiInstance();


/**
 * Adds the Authorization header to the request config if an access token is available.
 * @param {Object} config - The request configuration object
 * @returns {Object} Updated request configuration
 */
const addAuthorizationHeader = (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};



/**
 * Handles response errors in the axios interceptor.
 * @param {Object} error - The error object
 * @returns {Promise} Rejected promise with the error
 */
api.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
        Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
    }
    return config;
});




/**
 * Handles request errors in the axios interceptor.
 * @param {Error} error - The error object
 * @returns {Promise} Rejected promise with the error
 */
const handleRequestError = (error) => Promise.reject(error);

api.interceptors.request.use(addAuthorizationHeader, handleRequestError);






/**
 * Handles successful responses in the axios interceptor.
 * @param {Object} response - The response object
 * @returns {Object} The unchanged response object
 */
const handleSuccessfulResponse = (response) => response;



/**
 * Refreshes the access token using the refresh token.
 * @param {string} refreshToken - The refresh token
 * @returns {Promise<string>} Promise resolving to the new access token
 */
const refreshAccessToken = async (refreshToken) => {
    const response = await axios.post(AUTH_REFRESH_URL, {
        refresh_token: refreshToken,
    });
    return response.data.access_token;
};


/**
 * Updates the access token in local storage.
 * @param {string} accessToken - The new access token
 */
const updateAccessToken = (accessToken) => {
    localStorage.setItem('access_token', accessToken);
};


/**
 * Clears all authentication tokens from local storage.
 * Optionally redirects to login page (commented out in the current implementation).
 */
const clearAuthTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
    // Redirect to login page or show login modal
    // For example: window.location.href = '/login';
};


/**
 * Handles response errors in the axios interceptor.
 * Attempts to refresh the access token if the error is due to an unauthorized (401) status.
 * @param {Error} error - The error object
 * @returns {Promise} Either a new request with the refreshed token or a rejected promise
 */
const handleResponseError = async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const newAccessToken = await refreshAccessToken(refreshToken);

            updateAccessToken(newAccessToken);

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            clearAuthTokens();
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
};

api.interceptors.response.use(handleSuccessfulResponse, handleResponseError);

export default api;