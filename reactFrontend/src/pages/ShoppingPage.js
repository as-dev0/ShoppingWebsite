import React from 'react';
import ShoppingProductList from '../components/ShoppingProductList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ShoppingPage() {

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const userid = 0;
    useEffect(() => {

        const loadProducts = async () => {
            const response = await fetch(`/api/products`);
            const productjson = await response.json();
            setProducts(productjson);
        }
    
        const loadCartItems = async () => {
            const cartResponse = await fetch(`/api/cartitemlist/${userid}`);
            const cartjson = await cartResponse.json();
            setCartItems(cartjson);
        }

        loadProducts();
        loadCartItems();
    }, []);

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
        const cartResponse = await fetch(`/api/cartitemlist/${userid}`);
        const cartjson = await cartResponse.json();
        setCartItems(cartjson);
      };

    const history = useHistory();

    const getItemQuantity = (productid) => {
        for (let i = 0; i < cartItems.length; i++){
            if (cartItems[i].productid === productid){
                return cartItems[i].quantity;
            } 
        }
        return 0;
    }

    const goToCheckout = () => {
        if (cartItems.length === 0){
          alert("Your cart is empty.");
        }
        else {
          history.push("/checkout");
        }
    }

    return (
        <>
            <Link id="link" to="/cart"  className='linkleft'>View Cart</Link><br></br>
            <Link id="link" to="/allorders"  className='linkleft'>View All Orders</Link><br></br>
            <Link id="link" to="/settings"  className='linkleft'>Settings</Link><br></br>

            <h3>Shop</h3>

            <ShoppingProductList 
            getItemQuantity={getItemQuantity} 
            products={products} 
            updateServerQuantity={updateServerQuantity} />
            
            <div id="space"></div>
            <button onClick={goToCheckout}>Checkout</button> <br></br>
        </>
    );
}

export default ShoppingPage;
