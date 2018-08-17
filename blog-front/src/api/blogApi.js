import axios from 'axios';

const API_URL = 'http://localhost:3000';

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

securedAxiosInstance.interceptors.request.use((config) => {
  const method = config.method.toUpperCase();
  const configCp = config;
  if (method !== 'OPTIONS' && method !== 'GET') {
    configCp.headers = {
      ...configCp.headers,
      'X-CSRF-TOKEN': localStorage.csrf,
    };
  }
  return configCp;
});

securedAxiosInstance.interceptors.response.use(null, (error) => {
  if (error.response && error.response.config && error.response.status === 401) {
    // In case 401 is caused by expired access cookie - we'll do refresh request
    return plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
      .then((response) => {
        localStorage.csrf = response.data.csrf;
        localStorage.signedIn = true;
        // And after successful refresh - repeat the original request
        const retryConfig = error.response.config;
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf;
        return plainAxiosInstance.request(retryConfig);
      }).catch((handleError) => {
        delete localStorage.csrf;
        delete localStorage.signedIn;
        // redirect to signin in case refresh request fails
        location.replace('/');
        return Promise.reject(handleError);
      });
  }
  return Promise.reject(error);
});

export { securedAxiosInstance, plainAxiosInstance };
