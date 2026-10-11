import React from 'react';

const Categories = () => {
  const categories = ['Baseball Caps', 'Beanies', 'Fedoras', 'Snapbacks'];

  return (
    <div className="py-10 px-6 bg-gray-100">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Shop by Category</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <li
            key={category}
            className="group border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition-shadow"
          >
            <a
              href={`/shop?category=${category}`}
              className="block text-center text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
