import React from "react";
import Subtotal from "./Subtotal";
import "./Checkout.css";
import CartItem from "./CartItem";
import { useStateValue } from "../StateProvider";
function Checkout() {
  const [{ basket, value, size, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout_ad"
        />
        <h3>{"Hello " + (user?.displayName || user?.email || "Guest")}</h3>
        {basket.length ? (
          <div>
            <h2 className="checkout_title">Your Shopping Basket</h2>
            <div className="cart_items">
              {basket?.map((item) => (
                <CartItem
                  id={item?.id}
                  count={item?.count}
                  title={item?.title}
                  price={item?.price}
                  image={item?.image}
                  rating={item?.rating}
                  final={true}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className="checkout_title">Your Basket is Empty</h2>
            <p className="checkout_desc">
              You have no items in your basket. To buy one or more items, click
              "Add to basket" next to the item.
            </p>
          </>
        )}
      </div>
      {size > 0 && (
        <div className="checkout_right">
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
