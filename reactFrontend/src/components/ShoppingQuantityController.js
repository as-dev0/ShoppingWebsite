import React from 'react';
import {HiMinus, HiPlus} from "react-icons/hi";
import { useState } from 'react';

function ShoppingQuantityController({product, getItemQuantity, updateServerQuantity}) {

  const [quantity, setQuantity] = useState(getItemQuantity(product.id));
  const userid = 0;
  const increment = () => {updateServerQuantity(userid,product.id,quantity+1); setQuantity(quantity => quantity + 1); }
  const decrement = () => {updateServerQuantity(userid,product.id,quantity-1); setQuantity(quantity => quantity - 1); }

  return (
    <>
        {quantity > 0 ? <HiMinus onClick={decrement} /> : <HiMinus />}  
                <HiPlus onClick={increment} /> {quantity}
    </>
  )
}

export default ShoppingQuantityController;