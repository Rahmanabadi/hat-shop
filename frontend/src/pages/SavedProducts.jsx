import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlConsts } from "../consts"

const SavedProducts = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${urlConsts.API}api/user/products`, {
          headers: {
            'authToken': token
          }
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div>
      <h2>Saved Products</h2>
      <ul>
        {Object.entries(products).map(([productId, quantity]) => (
          <li key={productId}>Product ID: {productId}, Quantity: {quantity}</li>
          
        ))}
      </ul>
    </div>
  );
};

export default SavedProducts;
