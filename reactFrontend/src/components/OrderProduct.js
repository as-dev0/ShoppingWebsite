import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function OrderProduct({ cartitem }) {

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
                    <td><img src={productInfo.imageurl} width="50" height="100" alt="product" onClick={goToProduct}  style={{cursor:'pointer'}} /></td>
                    <td>{productInfo.name}</td>
                    <td>${productInfo.price}</td>
                    <td>{cartitem.quantity}</td>
            </tr>
        </>
    );
}

export default OrderProduct;
