import React from "react";
import "./Order.css";
import moment from "moment";
import CartItem from "./CartItem";
import CurrencyFormat from "react-currency-format";
function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order?.data?.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      {order?.data?.basket?.map((item) => (
                <CartItem 
                  id={item?.id}
                  title={item?.title}
                  price={item?.price}
                  image={item?.image}
                  rating={item?.rating}
                  count={item?.count}
                  final={false}
                />
              ))}
              <CurrencyFormat
                  renderText={(value) => <h3 className="order_total">Order Total:{value}</h3>}
                  decimalScale={2}
                  value={order?.data?.amount/100}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
    </div>
  );
}

export default Order;
