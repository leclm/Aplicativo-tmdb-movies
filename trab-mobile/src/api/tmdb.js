import axios from 'axios';
//import { API_KEY } from '@env';

const API_KEY = 'd7bc3c3a8beadfcc90bc7e5e558c6e90';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: API_KEY,
  }
});