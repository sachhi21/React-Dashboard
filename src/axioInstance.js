import axios from 'axios';
export const axiosiInstance = axios.create({
  baseURL: 'http://localhost:5000',
});
