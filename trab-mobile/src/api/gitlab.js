import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const gitlab = axios.create({
  baseURL: 'https://gitlab.com/api/v4/'
});

gitlab.interceptors.request.use(
  async (config) => {
    const access_token = await AsyncStorage.getItem('access_token');
    if(access_token){
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return(config);
  },
  (err) => {
    return Promise.reject(err);
  }
)

export default gitlab;
