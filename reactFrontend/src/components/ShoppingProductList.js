import React from 'react';
import ShoppingProduct from './ShoppingProduct';

function ShoppingProductList({ getItemQuantity, products, updateServerQuantity }) {
    return (
        <>
            {products.map(
                (product, i) => (
                <ShoppingProduct 
                getItemQuantity={getItemQuantity} 
                product={product} 
                updateServerQuantity={updateServerQuantity} 
                key={i} />)
            )}
        </>
    );
}

export default ShoppingProductList;
