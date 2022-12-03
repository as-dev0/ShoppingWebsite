import React, { useEffect } from 'react'
import {HiMinus, HiPlus} from "react-icons/hi";
import { useState } from 'react';

function CartQuantityController({updateServerQuantity, cartitem}) {

  const [quantity, setQuantity] = useState(cartitem.quantity);
  const userid = 0;
  
  useEffect(()=> {setQuantity(cartitem.quantity)},[cartitem]);

  const increment = () => {setQuantity(quantity => quantity + 1); updateServerQuantity(userid,cartitem.productid,quantity+1);}
  const decrement = () => {setQuantity(quantity => quantity - 1); updateServerQuantity(userid,cartitem.productid,quantity-1);}

  return (
    <>
        {quantity > 0 
        ? <HiMinus onClick={decrement} /> 
        : <HiMinus />}  
        <HiPlus onClick={increment} /> {quantity}
    </>
  )
}

export default CartQuantityController;