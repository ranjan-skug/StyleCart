import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlices";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";

export default function EditProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProducts, loading, error } = useSelector(
    (state) => state.products,
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    sku: "",
    brand: "",
    sizes: [],
    colors: [],
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false); // Image Uploading state

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProducts) {
      setProductData(selectedProducts);
    }
  }, [selectedProducts]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handelImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Product ID:", id);
      console.log("Updating product:", productData);

      await dispatch(
        updateProduct({
          id,
          productData,
        }),
      ).unwrap();

      console.log("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error("Product update failed:", error);
    }
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handelSubmit}>
        {/* Name Field */}
        <div className="mb-6">
          <label className="font-semibold mb-2 block">Product Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            required
            onChange={handelChange}
            name="name"
            value={productData.name}
          />
        </div>
        {/* Description Field */}
        <div className="mb-6">
          <label className="font-semibold mb-2 block">Description</label>
          <textarea
            className="w-full border-gray-300 border rounded-md p-2"
            rows={4}
            onChange={handelChange}
            name="description"
            required
            value={productData.description}
          ></textarea>
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="font-semibold mb-2 block">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handelChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Count In Stock */}
        <div className="mb-6">
          <label className="font-semibold mb-2 block">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handelChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* sku */}
        <div className="mb-6">
          <label className="font-semibold mb-2 block">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handelChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="font-semibold mb-2 block">
            Sizes (Comma Separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Color */}
        <div className="mb-6">
          <label className="font-semibold mb-2 block">
            Color (Comma Separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Images */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handelImageUpload} />
          {uploading && <p>Uploading image...</p>}
          <div className="flex mt-4 gap-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
