import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import{useHistory} from "react-router-dom"
function Subtotal() {
    const[{value,size,user}]=useStateValue();
    const history=useHistory();
    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(value)=>(
                <>
                <p>
                    Subtotal({size} items):
                    <strong>{value}</strong>
                </p>
                <small className="subtotal_gift">
                    <input type="checkbox"/>This Order contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
            />
            <button onClick={e=>(user?history.push("/payment"):history.push("/login"))}> Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
