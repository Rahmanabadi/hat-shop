import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urlConsts } from '../consts';

const ProductForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    barcode: '',
    name: '',
    category: '',
    new_price: '',
    old_price: '',
    image: null, 
  });

  

  useEffect(() => {
    if (id) {
      fetch(`${urlConsts.API}api/products/${id}`)
        .then((response) => response.json())
        .then((data) =>
          setProduct({
            barcode: data.barcode,
            name: data.name,
            category: data.category,
            new_price: data.new_price,
            old_price: data.old_price,
            image: null, 
          })
        )
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('barcode', product.barcode);
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('new_price', product.new_price);
    formData.append('old_price', product.old_price);
    if (product.image) {
      formData.append('image', product.image); 
    }

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `${urlConsts.API}api/products/${id}`
      : `${urlConsts.API}api/products`;

    try {
      const response = await fetch(url, {
        method: method,
        body: formData, 
      });

      if (response.ok) {
        navigate('/products'); 
      } else {
        console.error('Error saving product:', await response.text());
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {id ? 'Edit Product' : 'Add New Product'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Barcode:</label>
          <input
            type="number"
            name="barcode"
            value={product.barcode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category:</label>
          <input
            type="text"
            placeholder='m | w | c | best'
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">New Price:</label>
          <input
            type="number"
            name="new_price"
            value={product.new_price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Old Price:</label>
          <input
            type="number"
            name="old_price"
            value={product.old_price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {id ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
