import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlices";

export default function ProductDetails({ productId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProducts, loading, error, simmilarProducts } = useSelector(
    (state) => state.products,
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProducts?.images?.length > 0) {
      setMainImage(selectedProducts.images[0].url);
    }
  }, [selectedProducts]);

  const handelChangeQuantity = (action) => {
    if (action == "plus") setQuantity((prev) => prev + 1);
    if (action == "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handelAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart!.", {
        duration: 1000,
      });
      return;
    }
    setIsDisabledButton(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      }),
    )
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsDisabledButton(false);
      });
  };

  if (loading) {
    return <p>Loding...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="py-6">
      {selectedProducts && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProducts.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image.url)}
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt="Main Product Image"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
              {selectedProducts.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image.url)}
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                />
              ))}
            </div>
            {/* Right Side */}
            <div className="w-1/2 md:ml-6">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProducts.name}
              </h2>
              <p className="text-lg text-red-600 mb-1 line-through">
                {selectedProducts.originalPrice &&
                  `${selectedProducts.originalPrice}`}
              </p>
              <p className="text-gray-500 text-xl mb-2">
                $ {selectedProducts.price}
              </p>
              <p className="text-gray-600 mb-4">
                {selectedProducts.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-600">Colors:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProducts.colors.map((color) => (
                    <button
                      onClick={() => setSelectedColor(color)}
                      key={color}
                      className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor == color ? "border-4 border-black" : "border-gray-200"}`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Sizes:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProducts.sizes.map((size) => (
                    <button
                      onClick={() => setSelectedSize(size)}
                      key={size}
                      className={`px-4 py-2 rounded border cursor-pointer ${selectedSize == size ? "bg-black text-white" : "bg-white"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handelChangeQuantity("minus")}
                    className="px-3 bg-gray-200 rounded text-xl cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 rounded border">{quantity}</span>
                  <button
                    onClick={() => handelChangeQuantity("plus")}
                    className="px-3 bg-gray-200 rounded text-xl cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handelAddToCart}
                disabled={isDisabledButton}
                className={`w-full mb-4 rounded border py-2 px-6 text-white transition-all duration-300
    ${
      isDisabledButton
        ? "cursor-not-allowed bg-gray-400 opacity-50"
        : "cursor-pointer bg-black hover:bg-gray-800 hover:scale-[1.02] active:scale-95"
    }`}
              >
                {isDisabledButton ? "Adding..." : "Add to Cart"}
              </button>
              <div className="mt-10 text-gray-700">
                <h3>Characteristics</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1 font-bold">Brand:</td>
                      <td className="py-1">{selectedProducts.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold">Matarial:</td>
                      <td className="py-1">{selectedProducts.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-4 text-center">
              You May Also Like
            </h2>
            <ProductGrid
              products={simmilarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
}
