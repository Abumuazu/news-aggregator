import { AxiosError } from 'axios';

export const handleApiError = (error: unknown, source: string) => {
  const axiosError = error as AxiosError;
  console.error(`${source} Error:`, {
    message: axiosError.message,
    status: axiosError.response?.status,
    data: axiosError.response?.data,
  });
  return [];
}; 