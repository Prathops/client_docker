import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getItems = async () => {
  const response = await api.get('/items');
  return response.data;
};

export const createItem = async (payload) => {
  const response = await api.post('/items', payload);
  return response.data;
};

export const updateItem = async (id, payload) => {
  const response = await api.put(`/items/${id}`, payload);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};

export default api;
