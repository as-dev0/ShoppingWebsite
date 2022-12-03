import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ProductQuantityController from '../components/ProductQuantityController';
//import StarRatingComponent from 'react-star-rating-component';

function ProductDetails() {

  const [product, setProduct] = useState([]);
  const [item, setItem] = useState(null);

  const {productid} = useParams();
  const userid = 0;
  useEffect(() => {

    const loadProduct = async () => {
      const productResponse = await fetch(`/api/products/${productid}`);
      const productResponsejson = await productResponse.json();
      setProduct(productResponsejson);
    }
  
    const loadItem = async () => {
      const itemResponse = await fetch(`/api/cartitem/${userid}/${productid}`);
      if (itemResponse.status !== 404){
        const itemResponsejson = await itemResponse.json();
        setItem(itemResponsejson);
      }
    }

    loadProduct();
    loadItem();

  }, [productid]);

  const getItemQuantity = (productid) => {
    if (item == null){
      return 0;
    }
    return item.quantity;
  }

  return (
    <>
      <Link id="link" to="/" className='linkleft'>Back to shopping page</Link> <br></br>

      <img src={product.imageurl} width="200" height="300" alt="product" /><br></br>
      {product.name} <br></br>
      ${product.price} <br></br>
      <ProductQuantityController product={product} getItemQuantity={getItemQuantity} item={item} /><br></br><br></br><br></br><br></br>
      {/*<StarRatingComponent name="productrating" value={product.rating} editing={false} /> <br></br>*/}
      {product.description} <br></br> <br></br>
    </>
  );
}

export default ProductDetails;