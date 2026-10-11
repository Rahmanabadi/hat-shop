import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { urlConsts } from "../consts";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { barcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${urlConsts.API}api/products/${barcode}`
        );
        setProduct(response.data);
        console.log("🚀 ~ fetchProduct ~ response:", response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, []);

  const addToCart = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in to add products to your cart.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${urlConsts.API}user/save-product`,
        { barcode: barcode, quantity: 1 },
        { headers: { authToken: token } }
      );
      alert("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  if (!product)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full mb-5 overflow-hidden flex justify-center items-center px-4 sm:px-6 lg:px-8 mt-10">
      <div className="bg-white w-full lg:w-[70%] rounded-xl shadow-lg p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <div className="w-full h-72 lg:h-[60vh] bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={
                  product.image
                    ? `${urlConsts.API}${product.image}`
                    : "https://via.placeholder.com/400"
                }
                alt={product.name || "Product Image"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-2">
              Price:{" "}
              <span className="font-semibold text-green-600">
                ${product.new_price}
              </span>
            </p>
            <p className="text-sm lg:text-base text-gray-700 leading-relaxed mb-6">
              {product.description || "No description available"}
            </p>
            <button
              onClick={addToCart}
              className="w-full lg:w-auto px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
