import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { urlConsts } from "../../consts"

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHats = async () => {
      try {
        const response = await axios.get(`${urlConsts.API}api/bestseller`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching children hats:', error);
      }
    };

    fetchHats();
  }, []);

  const handleProductClick = (barcode) => {
    navigate(`/product/${barcode}`);
  };

  const handleAddToCart = (barcode) => {
    navigate(`/product/${barcode}`);
  };

  return (
    <section className="best-sellers py-8 px-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.barcode}
            onClick={() => handleProductClick(product.barcode)}
            className="product-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={`${urlConsts.API}${product.image}`}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-xl font-bold text-green-600">${product.new_price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product.barcode)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;