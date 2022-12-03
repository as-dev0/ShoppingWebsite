import React from 'react'
import { Link } from 'react-router-dom';
import OrderProductList from '../components/OrderProductList';
import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';

function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const userid = 0;
    useEffect(() => {

        const loadOrders = async ()=> {
            
            const orders = await fetch(`/api/orders/${userid}`);
            const ordersjson = await orders.json();
    
            var tempOrderItems = {};
    
            for (let i = 0; i < ordersjson.length; i++){
                const singleOrderItems = await fetch(`/api/orderitem/${userid}/${ordersjson[i].id}`);
                tempOrderItems[ordersjson[i].id] = await singleOrderItems.json();
            }

            setOrderItems(tempOrderItems);
            setOrders(ordersjson.reverse());
        }

        loadOrders(); 
      }, []);

    return (
        <>
            <Link id="link" to="/" className='linkleft'>Back to shopping page</Link> <br></br>

            <h3>All Orders</h3><br></br>

            {orders.map((order, i) =>(

            <>
                <OrderProductList cartItems={orderItems[order.id]} order={order} /> <br></br><br></br><br></br><br></br>
            </> 
            
            )) }

            <Link id="link" to="/">Back to shopping page</Link> <br></br>

        </>
    )
}

export default OrdersPage