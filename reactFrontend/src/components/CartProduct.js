import React from 'react';
import CartQuantityController from './CartQuantityController';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CartProduct({ updateServerQuantity, cartitem }) {

    const [productInfo, setProductInfo] = useState([]);
    const history = useHistory();
    
    useEffect(() => {

        const loadProductInfo = async () => {
            const response = await fetch(`/api/products/${cartitem.productid}`);
            const jsonresponse = await response.json();
            setProductInfo(jsonresponse);
        }

        loadProductInfo();
    }, [cartitem]);

    const goToProduct = () => {
        history.push(`/product/${cartitem.productid}`);
    }

    return (
        <>
            <tr>
                <td><img src={productInfo.imageurl} width="50" height="100" alt="product" onClick={goToProduct}  style={{cursor:'pointer'}}  /></td>
                <td>{productInfo.name}</td>
                <td>${productInfo.price}</td>
                <td><CartQuantityController updateServerQuantity={updateServerQuantity} cartitem={cartitem} /></td>
            </tr>
        </>
    );
}

export default CartProduct;
