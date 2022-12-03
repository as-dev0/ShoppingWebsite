import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CartProductList from '../components/CartProductList';

function CartPage() {

    const [cartItems, setCartItems] = useState([]);
    const history = useHistory();
    const userid = 0;
    useEffect(() => {
      loadCartItems();
      }, []);

    const loadCartItems = async () => {
      const cartResponse = await fetch(`/api/cartitemlist/${userid}`);
      const cartjson = await cartResponse.json();
      setCartItems(cartjson);
    }

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
        loadCartItems();
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
          <Link id="link" to="/" className='linkleft'>Back to shopping page</Link> <br></br>

            <h3>Cart</h3><br></br><br></br>
            <CartProductList updateServerQuantity={updateServerQuantity} cartItems={cartItems} />
            <button onClick={goToCheckout}>Checkout</button> <br></br>
        </>
    );
}

export default CartPage;