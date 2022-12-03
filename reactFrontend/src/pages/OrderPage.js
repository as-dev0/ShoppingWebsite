import React from 'react'
import { Link, useParams } from 'react-router-dom';
import OrderProductList from '../components/OrderProductList';
import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';

function OrderPage() {

    const [orderItems, setOrderItems] = useState([]);
    const [order, setOrder] = useState([]);
    const {orderid} = useParams();
    const userid = 0;

    useEffect(() => {

        const loadOrderItems = async ()=> {
            const singleOrderItems = await fetch(`/api/orderitem/${userid}/${orderid}`);   
            const singleOrderItemsjson = await singleOrderItems.json();
            setOrderItems(singleOrderItemsjson);
        }

        const loadOrder = async () => {
            const response = await fetch(`/api/orders/${userid}/${orderid}`);   
            const responsejson = await response.json();
            setOrder(responsejson);
        }

        loadOrderItems();
        loadOrder();

      }, [orderid]);

    return (
        <>
            <Link id="link" to="/" className='linkleft'>Back to shopping page</Link> <br></br>
            <Link id="link" to="/allorders"  className='linkleft'>View All Orders</Link><br></br>

            Your Order Has Been Placed!<br></br><br></br>

            <>
                <OrderProductList cartItems={orderItems} order={order} /> <br></br><br></br><br></br><br></br>
            </> 

        </>
    )
}

export default OrderPage