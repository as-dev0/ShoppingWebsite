import React, { useEffect } from 'react';
import CartProduct from './CartProduct';
import { useState } from 'react';

function CartProductList({ updateServerQuantity, cartItems }) {

    const [total, setTotal] = useState(0);

    useEffect(()=> {

        var tempTotal = 0;

        const getProductPrice = async (cartitem) => {
            const response = await fetch(`/api/products/${cartitem.productid}`);
            const jsonresponse = await response.json();
            tempTotal += jsonresponse.price * cartitem.quantity;
            setTotal(tempTotal);
        }
        const computeTotal = () => {
            for (let i = 0; i < cartItems.length ; i++){
                getProductPrice(cartItems[i]);
            }
            if (cartItems.length === 0) {
                setTotal(0);
            }
        }

        computeTotal()
    
    },[cartItems]);


    return (
        <>
            <table id="cart">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Quantity in Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((cartitem, i) =>( 
                        <CartProduct
                        updateServerQuantity={updateServerQuantity} 
                        cartitem={cartitem} key={i} /> 
                    ))}
                </tbody>

            </table>
            <p className='center'>
                Total:  ${(total*1.05).toFixed(2)}     (${(0.05*total).toFixed(2)} in sales tax)
            </p>
        </>
    );
}

export default CartProductList;
