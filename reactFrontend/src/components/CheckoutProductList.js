import React from 'react';
import OrderProduct from './OrderProduct';

function CheckoutProductList({ cartItems, total }) {

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
                        <OrderProduct
                        cartitem={cartitem} 
                        key={i} /> 
                    ))}
                </tbody>

            </table>
            <p className='center'>
                Total:  ${(total*1.05).toFixed(2)}     (${(0.05*total).toFixed(2)} in sales tax)
            </p>
        </>
    );
}

export default CheckoutProductList;
