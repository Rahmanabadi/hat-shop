import React from 'react';

const Discounts = () => {
  return (
    <section className="py-8 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Special Discounts
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
          <img
            src="https://i.pinimg.com/236x/bb/78/bf/bb78bf30c0216620ede413cd7fcbfcdb.jpg"
            alt="Beanies"
            className="w-full h-40 object-cover rounded-t-lg mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            20% Off on Beanies
          </h3>
          <p className="text-gray-600 text-sm">
            Use code <span className="font-semibold text-gray-800">BEANIE20</span>
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
          <img
            src="https://i.pinimg.com/236x/a9/c6/6f/a9c66f8d10360ff3833bf9a3f7a52445.jpg"
            alt="Caps"
            className="w-full h-40 object-cover rounded-t-lg mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Buy 1 Get 1 Free on Caps
          </h3>
          <p className="text-gray-600 text-sm">
            Use code <span className="font-semibold text-gray-800">BOGO</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Discounts;
