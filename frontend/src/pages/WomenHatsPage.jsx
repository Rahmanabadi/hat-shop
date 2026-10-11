import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { urlConsts } from "../consts"

const WomenHatsPage = () => {
  const [hats, setHats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHats = async () => {
      try {
        const response = await axios.get(`${urlConsts.API}api/women-hats`);
        setHats(response.data);
      } catch (error) {
        console.error('Error fetching women hats:', error);
      }
    };

    fetchHats();
  }, []);

  const handleProductClick = (barcode) => {
    navigate(`/product/${barcode}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 my-8">Women Hats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hats.map((hat) => (
          <div
            key={hat.barcode}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer p-4 flex flex-col items-center"
            onClick={() => handleProductClick(hat.barcode)}
          >
            <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
              {hat.image ? (
                <img
                  src={`${urlConsts.API}${hat.image}`}
                  alt={hat.name}
                  className="object-cover max-h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                  No Image Available
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <div className="text-lg font-semibold text-gray-700">{hat.name}</div>
              <div className="mt-2 text-gray-500">
                <span className="text-lg font-bold text-green-600">${hat.new_price}</span>
                {hat.old_price && (
                  <span className="ml-2 line-through text-gray-400">${hat.old_price}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenHatsPage;
