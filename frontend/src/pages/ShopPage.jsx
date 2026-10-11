import React from 'react';

const ShopPage = () => {
  const products = [
    { id: 1, name: 'Hat 1', price: '$10' },
    { id: 2, name: 'Hat 2', price: '$15' },
    { id: 3, name: 'Hat 3', price: '$20' },
  ];

  return (
    <div className="w-full min-h-[24rem] bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 my-8">Shop Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src="https://via.placeholder.com/300"
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
              <p className="text-gray-500 mt-2">{product.price}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
