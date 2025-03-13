import axios from 'axios';

interface ApiConfig {
  baseURL: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

const createApiClient = (config: ApiConfig) => {
  return axios.create(config);
};



export const apiClients = {

  newsApi: createApiClient({
    baseURL: 'https://newsapi.org/v2',
    headers: {
      'X-Api-Key': process.env.REACT_APP_NEWSAPI_KEY || 'ac76f33dd3ea48d48a61b4cb11473db3',
    },
  }),

  guardian: createApiClient({
    baseURL: 'https://content.guardianapis.com',
    headers: {
      'Authorization': process.env.REACT_APP_GUARDIAN_KEY || '4e709176-1e72-413a-9149-6b27b7bec457',
    },
  }),

  nyt: createApiClient({
    baseURL: 'https://api.nytimes.com/svc/search/v2',
  }),
}; 