import axios from 'axios';

const fileInstance = () => {
  const token = localStorage.getItem('token');
  
  if(!token) {
    // console.log('JWT Token is null or undefined');
  }

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, 
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return instance;
};
const createAxiosInstance= () => {
  const token = localStorage.getItem('token');

  if(!token) {
    // console.log('JWT Token is null or undefined');
  }
  
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
    // withCredentials: true,
  });

  return instance;
};

export { fileInstance, createAxiosInstance };
