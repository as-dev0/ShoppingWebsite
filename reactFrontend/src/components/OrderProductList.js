import React, {useState, useEffect} from 'react';
import OrderProduct from './OrderProduct';

function OrderProductList({ cartItems, order }) {

    const [total, setTotal] = useState(0);
    const [billing, setBilling] = useState([]);
    const [shipping, setShipping] = useState([]);
    const [payment, setPayment] = useState([]);

    const userid = 0;

    useEffect(() => {

        console.log("in order product list in useeffect, order is");
        console.log(order);

        const loadBilling = async () => {
            const reponse = await fetch(`/api/billingaddress/${userid}/${order.billingid}`);   
            const responsejson = await reponse.json();
            console.log(responsejson);
            setBilling(responsejson);
        }

        const loadShipping = async () => {
            const reponse = await fetch(`/api/shippingaddress/${userid}/${order.shippingid}`);   
            const responsejson = await reponse.json();
            setShipping(responsejson);
        }

        const loadPayment = async () => {
            const reponse = await fetch(`/api/paymentmethod/${userid}/${order.paymentid}`);   
            const responsejson = await reponse.json();
            setPayment(responsejson);
        }

        loadBilling();
        loadShipping();
        loadPayment();
    }, [order])

    useEffect(()=> {

        var tempTotal = 0;

        const getProductPrice = async (cartitem) => {
            const response = await fetch(`/api/products/${cartitem.productid}`);
            const jsonresponse = await response.json();
            tempTotal += jsonresponse.price * cartitem.quantity;
            setTotal(tempTotal);
        }

        const computeTotal = () => {
            for (let i = 0; i < cartItems.length ; i++){
                getProductPrice(cartItems[i]);
            }
            
        }

        computeTotal()
    },[cartItems]);

    const lastFour = payment.cardNumber != null
    ? payment.cardNumber.toString().slice(payment.cardNumber.toString().length-4,payment.cardNumber.toString().length)
    : <></> ;
    return (
        <>
                <p className='left'>
                    Order # {order.id}<br></br>
                    {order.date} <br></br>
                </p>
                <p className='left'>
                    Shipping Address:<br></br>
                    {shipping.name}<br></br>
                    {shipping.streetAddress1}<br></br>
                    { ()=> {if (shipping.streetAddress2 !== "") {return <>shipping.streetAddress2 <br></br></> } } }
                    {shipping.city}, {shipping.state} {shipping.zipCode}<br></br>
                </p>
                <p className='left'>
                    Billing Address:<br></br>
                    {billing.name}<br></br>
                    {billing.streetAddress1}<br></br>
                    { ()=> {if (billing.streetAddress2 !== "") {return <>billing.streetAddress2 <br></br></> } } }
                    {billing.city}, {billing.state} {billing.zipCode}<br></br>
                </p>
                <p className='left'>
                    Payment Method: {payment.name}'s card ending in {lastFour }<br></br>
                </p>

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

export default OrderProductList;
