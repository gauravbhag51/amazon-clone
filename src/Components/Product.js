import React from "react";
import "./Product.css";
import {useStateValue} from "../StateProvider";
function Product({ id,title, image, price, rating }) {
  const [{size,basket,value},dispatch]=useStateValue();
const addToBasket=()=>{
    const index=basket.findIndex(
          (item)=>item.id===id
      );
      if(index>=0)
      {
        basket[index].count=basket[index].count+1;
        dispatch({
          type:"ADD_TO_BASKET_EXISTS",
          basket:basket,
          value:value+price,
          size:size+1,
        })
      }
      else
      {
        dispatch({
      
          type:"ADD_TO_BASKET",
          item:{
            id:id,
            title:title,
            image:image,
            price:price,
            rating:rating,
            count:1,
          },
          size:size+1,
          value:value+price,
        })
      }
    
  }
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <strong>&#8377;{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
