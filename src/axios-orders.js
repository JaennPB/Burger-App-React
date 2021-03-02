import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-app-381dc-default-rtdb.firebaseio.com',
});

export default instance;
