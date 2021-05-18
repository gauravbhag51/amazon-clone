import React from "react";
import "./CartItem.css";
import { useStateValue } from "../StateProvider";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
function CartItem({ count,id, title, image, price, rating,final }) {
    const[{basket,value,size},dispatch]=useStateValue()



    const addToBasket=()=>{
        const index=basket.findIndex(
              (item)=>item.id===id
          );
            basket[index].count=basket[index].count+1;
            dispatch({
              type:"ADD_TO_BASKET_EXISTS",
              basket:basket,
              value:value+price,
              size:size+1,
            })
      }


    const removeFromBasket=()=>{
        const index=basket.findIndex(
            (item)=>item.id===id
        );
        if(index>=0)
        {
            basket[index].count=basket[index].count-1;
            console.log(basket);
            if(basket[index].count===0)
            basket.splice(index,1);
            // console.log(basket);
        }
        
        dispatch({
            type:"REMOVE_ITEM_FROM_CART",
            value:value-price,
            basket:basket,
            size:size-1,
        })
    }
  return (
    <div className="cartItem">
        <img src={image} alt="" />
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
          
          <div className="cartItem_count">
          { final &&
              <IndeterminateCheckBoxIcon className="operator"onClick={()=>removeFromBasket()}/>}
              <p className="count">{count}</p>
            {final &&  <AddBoxIcon className="operator" onClick={()=>addToBasket()}/>}
          </div>
        </div>
      
    </div>
  );
}

export default CartItem;
