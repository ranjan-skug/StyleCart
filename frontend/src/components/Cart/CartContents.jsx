import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

export default function CartContents({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  // Handel Adding or Substracting to cart

  const handelAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };

  const handelRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };
  return (
    <div>
      {cart.products.map((product) => (
        <div
          key={product.productId}
          className="flex py-4 items-start justify-between border-b"
        >
          <div className="flex items-start gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover rounded mr-4"
            />

            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex mt-2 items-center">
                <button
                  onClick={() =>
                    handelAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="border rounded text-xl px-2 py-1 font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handelAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="border rounded text-xl px-2 py-1 font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium">$ {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handelRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color,
                )
              }
            >
              <RiDeleteBin3Line className="mt-2 w-6 h-6 text-amber-700 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
