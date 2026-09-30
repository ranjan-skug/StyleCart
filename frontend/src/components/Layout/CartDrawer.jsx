import { HiMiniXMark } from "react-icons/hi2";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartDrawer({ cartDrawerOpen, toggleCartDrawer }) {
  const navigate = useNavigate();

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handelCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full flex flex-col z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${cartDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        {/* CLose Button area */}
        <button onClick={toggleCartDrawer}>
          <HiMiniXMark className="h-6 w-6" />
        </button>
      </div>
      {/* Cart Contents with Scrollable Areas */}
      <div className="flex-grow p-4 overflow-y-scroll">
        <h2 className="text-xl font-bold">Your Cart</h2>
        {/* Componets for Cart Contents */}

        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
      {/* Checkout Button */}
      <div className="sticky bottom-0 bg-white p-4">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handelCheckout}
              className="bg-black text-white text-xs rounded-lg py-3 w-full font-semibold hover:bg-gray-800 cursor-pointer transition"
            >
              CheckOut
            </button>
            <p className="text-sm tracking-lighter mt-2 text-center">
              Shipping, taxes and discount codes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
}
