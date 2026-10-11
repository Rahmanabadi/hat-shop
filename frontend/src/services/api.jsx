import axios from 'axios';
import { urlConsts } from '../consts';

const API_BASE_URL = urlConsts.API;

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/signup`, userData);
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/login`, credentials);
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};

export const updateCart = async (token, cartData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}cart`, cartData, {
      headers: {
        'authToken': token,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await axios.post(`${API_BASE_URL}user/save-product`, {
      productId: productId, 
      quantity: 1           
    }, {
      headers: { 'authToken': token }
    });

    console.log(response.data.message); 
  } catch (error) {
    console.error('Error adding product to cart:', error.response?.data?.message || error.message);
  }
};


export const getCartData = async (token) => {
  try {
    const response = await axios.get(`${urlConsts.API}cart`, {
      headers: { 'authToken': token },
    });
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
