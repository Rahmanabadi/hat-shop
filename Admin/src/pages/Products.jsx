import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConsts } from '../consts';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${urlConsts.API}api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${urlConsts.API}api/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product._id !== id));
        } else {
          console.error('Failed to delete product');
        }
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleAdd = () => {
    navigate('/add-product');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Add New Product
      </button>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">Barcode</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-center">New Price</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Old Price</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Image</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{product.barcode}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{product.category}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{product.new_price}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{product.old_price}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.image && (
                    <img
                      src={`${urlConsts.API}${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
