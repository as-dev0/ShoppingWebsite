import React from 'react';
import {HiMinus, HiPlus} from "react-icons/hi";
import { useState, useEffect } from 'react';


function ProductQuantityController({product, getItemQuantity, item}) {

  const [quantity, setQuantity] = useState(getItemQuantity(product.id));
  const userid = 0;
  
  useEffect(
    () => {
      if (item !== null){
        setQuantity(item.quantity);
      }
    }, [item]);

  const increment = () => {updateServerQuantity(userid,product.id,quantity+1); setQuantity(quantity => quantity + 1); }
  const decrement = () => {updateServerQuantity(userid,product.id,quantity-1); setQuantity(quantity => quantity - 1); }

  const updateServerQuantity = async (userid, productid, quantity) => {
    if (quantity !== 0){
      await fetch(`/api/cartitem/${userid}/${productid}` , {
        method: 'PUT',
        body: JSON.stringify({ userid:userid, productid:productid, quantity:quantity }),
        headers: {'Content-Type': 'application/json',},
      });
    }
    else {
      await fetch(`/api/cartitem/${userid}/${productid}` , {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',},
      });
    }
  };

  return (
    <>
        {quantity > 0 
        ? <HiMinus onClick={decrement} /> 
        : <HiMinus />}  
        <HiPlus onClick={increment} /> {quantity}
    </>
  )
}

export default ProductQuantityController;