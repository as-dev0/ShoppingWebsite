import React from 'react';
import { useHistory } from "react-router-dom";
import ShoppingQuantityController from './ShoppingQuantityController';
//import StarRatingComponent from 'react-star-rating-component';

function ShoppingProduct({ product, getItemQuantity, updateServerQuantity }) {
    
    const history = useHistory();

    const goToProduct = () => {
        history.push(`/product/${product.id}`);
    }

    return (
        <>
            <figure>
                <img src={product.imageurl} width="200" height="300" onClick={goToProduct} alt="product" style={{cursor:'pointer'}} />
                <figcaption>
                    {product.name} <br></br>
                    ${product.price} <br></br>
                    {/*<StarRatingComponent name="productrating" value={product.rating} editing={false} />*/}
                    <ShoppingQuantityController 
                    getItemQuantity={getItemQuantity} 
                    product={product} 
                    updateServerQuantity={updateServerQuantity} />
                </figcaption>
            </figure>
        </>
    );
}

export default ShoppingProduct;
