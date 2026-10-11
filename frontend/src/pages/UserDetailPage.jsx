import React, { useEffect, useState } from 'react';
import { getCartData } from '../services/api'; 
import { urlConsts } from "../consts"

const UserDetailPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('You are not logged in!');
          return;
        }
        const data = await getCartData(token); 
        setCartItems(data);
      } catch (err) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) return <h2>Your Saved Cart Items</h2>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 mt-5 bg-gray-100 min-h-screen">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Saved Cart Items</h2>
  {cartItems?.length === 0 ? (
    <p className="text-gray-600">No items in your cart</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cartItems?.map((item) => (
        <div
          key={item?.product?._id}
          className="flex items-center p-4 bg-white shadow-md rounded-lg"
        >
          <img
            src={`${urlConsts.API}${item.img}`}
            alt={item?.product?.name}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div>
            <p className="font-semibold text-gray-800 mb-2">
              {item?.product?.name}
            </p>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default UserDetailPage;

