import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import CartItem from "./CartItem";
import { Link, useHistory } from "react-router-dom";
import axios from "../axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { db } from "../firebase";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [{ basket, user, size, value }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${value * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [size,value]);

  console.log("THE SECRET IS >>>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>Checkout ({<Link to="/checkout">{size} items</Link>})</h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>3-138, AG COLONY</p>
            <p>Bajaj Nagar, Jaipur</p>
            <p>Rajasthan</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
            {basket?.map((item, index) => (
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
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total:{value}</h3>}
                  decimalScale={2}
                  value={value}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={processing || disabled || succeeded}
              >
                {processing ? <p>Processing</p> : "Buy Now"}
              </button>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
