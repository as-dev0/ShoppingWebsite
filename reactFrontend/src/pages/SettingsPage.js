import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Overlay from 'react-overlay-component';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function SettingsPage() {

    const [visibleBillingOverlay, setVisibleBillingOverlay] = useState(false);
    const [visibleShippingOverlay, setVisibleShippingOverlay] = useState(false);
    const [visiblePaymentOverlay, setVisiblePaymentOverlay] = useState(false);

    const [billingAddresses, setBillingAddresses] = useState([]);
    const [billingAddressesDropdown, setBillingAddressesDropdown] = useState([]);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);

    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [shippingAddressesDropdown, setShippingAddressesDropdown] = useState([]);
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethodsDropdown, setPaymentMethodsDropdown] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const [name, setName] = useState([]);
    const [street1, setStreet1] = useState([]);
    const [street2, setStreet2] = useState("");
    const [city, setCity] = useState([]);
    const [state, setState] = useState([]);
    const [zip, setZip] = useState([]);

    const [cardNumber, setCardNumber] =  useState([]);
    const [expirationMonth, setExpirationMonth]  = useState([]);
    const [expirationYear, setExpirationYear]  = useState([]);
    const [cvv, setcvv] = useState([]);

    const userid = 0;

    useEffect(() => {
      loadBillingAddresses();
      loadShippingAddresses();
      loadPaymentMethods();
      }, []);



    useEffect(() => {
        var tempArray = [];
        for (let i = 0; i < billingAddresses.length; i++){
            if (billingAddresses[i].deleted === false){
                tempArray.push(
                    billingAddresses[i].name + " " + 
                    billingAddresses[i].streetAddress1 + " " + 
                    billingAddresses[i].streetAddress2 + " " + 
                    billingAddresses[i].city + " " + 
                    billingAddresses[i].state + " " + 
                    billingAddresses[i].zipCode
                )
            }
        }
        setBillingAddressesDropdown(tempArray);

    }, [billingAddresses])

    useEffect(() => {
        var tempArray = [];
        console.log("recalculating shipping address dropdown");
        for (let i = 0; i < shippingAddresses.length; i++){
            if (shippingAddresses[i].deleted === false){

                tempArray.push(
                    shippingAddresses[i].name + " " + 
                    shippingAddresses[i].streetAddress1 + " " + 
                    shippingAddresses[i].streetAddress2 + " " + 
                    shippingAddresses[i].city + " " + 
                    shippingAddresses[i].state + " " + 
                    shippingAddresses[i].zipCode
                    )
            }
        }
        setShippingAddressesDropdown(tempArray);

    }, [shippingAddresses])

    useEffect(() => {
        var tempArray = [];
        for (let i = 0; i < paymentMethods.length; i++){
            if (paymentMethods[i].deleted === false){

            var n = paymentMethods[i].cardNumber.toString();
            tempArray.push(
                paymentMethods[i].name + "'s card ending in  " + 
                n.slice(n.length-4, n.length)
                );
            }
        }
        setPaymentMethodsDropdown(tempArray);

    }, [paymentMethods])

    const loadBillingAddresses = async () => {
        const response = await fetch(`/api/billingaddresses/${userid}`);
        const responsejson = await response.json();
        setBillingAddresses(responsejson);
    }

    const loadShippingAddresses = async () => {
        const response = await fetch(`/api/shippingaddresses/${userid}`);
        const responsejson = await response.json();
        setShippingAddresses(responsejson);
    }

    const loadPaymentMethods = async () => {
        const response = await fetch(`/api/paymentmethods/${userid}`);
        const responsejson = await response.json();
        setPaymentMethods(responsejson);
    }

    const toggleBillingOverlay = () => {
        setVisibleBillingOverlay(val => !val);
    }

    const toggleShippingOverlay = () => {
        setVisibleShippingOverlay(val => !val);
    }

    const togglePaymentOverlay = () => {
        setVisiblePaymentOverlay(val => !val);
    }

    const saveNewBillingAddress = async () => {

        // Validating name
        if (name.length === 0){
            alert("Name must not be empty");
            return;
        }

        // Validating street1
        if (street1.length === 0){
            alert("Street address must not be empty");
            return;
        }

        // Validating city
        if (city.length === 0){
            alert("City must not be empty");
            return;
        }

        // Validating state
        // -------------------------------------------------------------------
        if (state.length !== 2){
            alert("State must be two characters long");
            return;
        }
        var acceptedInput = ["A","B","C","D","E","F","G","H","I","J",
        "K","L","M","N","O","P","Q","R","S","T", "U", "V","W",'X','Y','Z'];

        for (let i = 0; i < state.length; i++){
            var found = false;
            for (let j = 0; j < acceptedInput.length; j++){
                if (state[i] === acceptedInput[j]){
                    found = true;
                    break;
                }
            }
            if (found === false){
                alert("State must only contain uppercase letters");
                return;
            }
        }

        // Validating zip code
        // ------------------------------
        if (zip.length !== 5){
            alert("Zip code must be five characters long");
            return;
        }
        acceptedInput = ["1","2","3","4","5","6","7","8","9","0"];

        for (let i = 0; i < zip.length; i++){
            found = false;
            for (let j = 0; j < acceptedInput.length; j++){
                if (zip[i] === acceptedInput[j]){
                    found = true;
                    break;
                }
            }
            if (found === false){
                alert("Zip code must only contain numbers");
                return;
            }
        }


        var newAddress = {userid:userid, name:name, streetAddress1:street1, city:city, state:state, zipCode:zip};

        if (street2 !== ""){
            newAddress["streetAddress2"] = street2;
        }

        await fetch(`/api/billingaddresses/${userid}`, {
            method: 'POST',
            body: JSON.stringify(newAddress),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        toggleBillingOverlay();
        loadBillingAddresses();
    }

    const saveNewShippingAddress = async () => {

        // Validating name
        if (name.length === 0){
            alert("Name must not be empty");
            return;
        }

        // Validating street1
        if (street1.length === 0){
            alert("Street address must not be empty");
            return;
        }

        // Validating city
        if (city.length === 0){
            alert("City must not be empty");
            return;
        }

        // Validating state
        // -------------------------------------------------------------------
        if (state.length !== 2){
            alert("State must be two characters long");
            return;
        }
        var acceptedInput = ["A","B","C","D","E","F","G","H","I","J",
        "K","L","M","N","O","P","Q","R","S","T", "U", "V","W",'X','Y','Z'];

        for (let i = 0; i < state.length; i++){
            var found = false;
            for (let j = 0; j < acceptedInput.length; j++){
                if (state[i] === acceptedInput[j]){
                    found = true;
                    break;
                }
            }
            if (found === false){
                alert("State must only contain uppercase letters");
                return;
            }
        }

        // Validating zip code
        // ------------------------------
        if (zip.length !== 5){
            alert("Zip code must be five characters long");
            return;
        }
        acceptedInput = ["1","2","3","4","5","6","7","8","9","0"];

        for (let i = 0; i < zip.length; i++){
            found = false;
            for (let j = 0; j < acceptedInput.length; j++){
                if (zip[i] === acceptedInput[j]){
                    found = true;
                    break;
                }
            }
            if (found === false){
                alert("Zip code must only contain numbers");
                return;
            }
        }

        var newAddress = {userid:userid, name:name, streetAddress1:street1, city:city, state:state, zipCode:zip};

        if (street2 !== ""){
            newAddress["streetAddress2"] = street2;
        }

        await fetch(`/api/shippingaddresses/${userid}`, {
            method: 'POST',
            body: JSON.stringify(newAddress),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        toggleShippingOverlay();
        loadShippingAddresses();
    }

    const saveNewPaymentMethod = async () => {

        // Validating name
        if (name.length === 0){
            alert("Name must not be empty");
            return;
        }

        // Validating card number
        // ------------------------------
        if (cardNumber.length !== 15 && cardNumber.length !== 16){
            alert("Card number must be 15 or 16 characters long");
            return;
        }
        var acceptedInput = ["1","2","3","4","5","6","7","8","9","0"];

        for (let i = 0; i < cardNumber.length; i++){
            var found = false;
            for (let j = 0; j < acceptedInput.length; j++){
                if (cardNumber[i] === acceptedInput[j]){
                    found = true;
                    break;
                }
            }
            if (found === false){
                alert("Card number must only contain numbers");
                return;
            }
        }

        // Validating expiration month
        // ------------------------------
        if (expirationMonth.length !== 2){
            alert("Expiration month must be two characters long");
            return;
        }
        acceptedInput = ["1","2","3","4","5","6","7","8","9","0"];

        for (let i = 0; i < expirationMonth.length; i++){
            found = false;
            for (let j = 0; j < acceptedInput.length; j++){
                if (expirationMonth[i] === acceptedInput[j]){
                    found = true;
                    break;
                }
            }
            if (found === false){
                alert("Expiration month must only contain numbers");
                return;
            }
        }

        // Validating expiration year
        // ------------------------------
        if (expirationYear.length !== 2){
            alert("Expiration year must be two characters long");
            return;
        }
        acceptedInput = ["1","2","3","4","5","6","7","8","9","0"];

        for (let i = 0; i < expirationYear.length; i++){
            found = false;
            for (let j = 0; j < acceptedInput.length; j++){
                if (expirationYear[i] === acceptedInput[j]){
                    found = true;
                    break;
                }
            }
            if (found === false){
                alert("Expiration year must only contain numbers");
                return;
            }
        }

        // Validating cvv
        // ------------------------------
        if (cvv.length !== 3 && cvv.length !==4){
            alert("Cvv must be three or four characters long");
            return;
        }
        acceptedInput = ["1","2","3","4","5","6","7","8","9","0"];

        for (let i = 0; i < cvv.length; i++){
            found = false;
            for (let j = 0; j < acceptedInput.length; j++){
                if (cvv[i] === acceptedInput[j]){
                    found = true;
                    break;
                }
            }
            if (found === false){
                alert("Cvv must only contain numbers");
                return;
            }
        }


        var newPayment = {userid:userid, name:name, cardNumber:cardNumber, expirationMonth:expirationMonth, 
            expirationYear:expirationYear, cvv:cvv};

        await fetch(`/api/paymentmethods/${userid}`, {
            method: 'POST',
            body: JSON.stringify(newPayment),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        togglePaymentOverlay();
        loadPaymentMethods();
    }


    const selectPayment = (payment) => {
        for (let i = 0; i < paymentMethods.length ; i++){
            if (paymentMethods[i].deleted === false){
                var n = paymentMethods[i].cardNumber.toString();
                var paymentString = 
                paymentMethods[i].name + "'s card ending in  " + 
                n.slice(n.length-4, n.length);

                if (paymentString===payment.value){
                    setSelectedPaymentMethod(paymentMethods[i].id);
                    break;
                }
                
            }
        }
    }

    const selectBillingAddress = (billing) => {
        for (let i = 0; i < billingAddresses.length ; i++){
            if (billingAddresses[i].deleted === false){
                var billingString = 
                    billingAddresses[i].name + " " + 
                    billingAddresses[i].streetAddress1 + " " + 
                    billingAddresses[i].streetAddress2 + " " + 
                    billingAddresses[i].city + " " + 
                    billingAddresses[i].state + " " + 
                    billingAddresses[i].zipCode;

                if (billingString===billing.value){
                    setSelectedBillingAddress(billingAddresses[i].id);
                    break;
                }
                
            }
        }
    }

    const selectShippingAddress = (shipping) => {
        for (let i = 0; i < shippingAddresses.length ; i++){
            if (shippingAddresses[i].deleted === false){
                var shippingString = 
                    shippingAddresses[i].name + " " + 
                    shippingAddresses[i].streetAddress1 + " " + 
                    shippingAddresses[i].streetAddress2 + " " + 
                    shippingAddresses[i].city + " " + 
                    shippingAddresses[i].state + " " + 
                    shippingAddresses[i].zipCode;

                if (shippingString===shipping.value){
                    setSelectedShippingAddress(shippingAddresses[i].id);
                    break;
                }
                
            }
        }
    }


    const deleteSelectedBilling = async () => {
        if (selectedBillingAddress == null){
            alert("No billing address selected");
            return
        }

        await fetch(`/api/billingaddress/${userid}/${selectedBillingAddress}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        refreshPage();

    }

    const deleteSelectedShipping = async () => {
        if (selectedShippingAddress == null){
            alert("No shipping address selected");
            return
        }
        await fetch(`/api/shippingaddress/${userid}/${selectedShippingAddress}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        refreshPage();

    }

    const deleteSelectedPayment = async () => {
        if (selectedPaymentMethod == null){
            alert("No payment method selected");
            return
        }

        await fetch(`/api/paymentmethod/${userid}/${selectedPaymentMethod}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        refreshPage();

    }

    var BillingDropdown = 
    <Dropdown className='width20percent'
    options={billingAddressesDropdown}
    onChange={selectBillingAddress}
    placeholder="Select a billing address" />;

    var ShippingDropdown = 
    <Dropdown  className='width20percent'
    options={shippingAddressesDropdown}
    onChange={selectShippingAddress}
    placeholder="Select a shipping address" />;

    var PaymentDropdown = 
    <>
        <Dropdown className='width20percent'
        options={paymentMethodsDropdown}
        onChange={selectPayment}
        placeholder="Select a payment method" />
    </> ;

    const refreshPage = () => {
        window.location.reload();
    }
    
    const closeBillingOverlay = () => setVisibleBillingOverlay(false);
    const closeShippingOverlay = () => setVisibleShippingOverlay(false);
    const closePaymentOverlay = () => setVisiblePaymentOverlay(false);

    return (
        <>
            <Link  id="link" to="/" className='linkleft'> Back to shopping page </Link> <br></br>
            <h3>Settings</h3><br></br><br></br>


            <div className='left'>
                <button onClick={toggleBillingOverlay}>Enter new billing address</button><br></br>
                <button onClick={toggleShippingOverlay}>Enter new shipping address</button><br></br>
                <button onClick={togglePaymentOverlay}>Enter new credit card</button><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br>

                {ShippingDropdown}<button onClick={deleteSelectedShipping}>Delete shipping address</button>

                {BillingDropdown}<button onClick={deleteSelectedBilling}>Delete billing address</button>

                {PaymentDropdown}<button onClick={deleteSelectedPayment}>Delete payment method</button>

            </div>

            <Overlay isOpen={visibleBillingOverlay} closeOverlay={closeBillingOverlay}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="Street Address Line 1"
                    value={street1}
                    onChange={e => setStreet1(e.target.value)} />
                <br></br>
                <input
                type="text"
                placeholder="Street Address Line 2"
                value={street2}
                onChange={e => setStreet2(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="Zip code"
                    value={zip}
                    onChange={e => setZip(e.target.value)} />
                <br></br>

                <button onClick={saveNewBillingAddress}>Save billing address</button>

            </Overlay>

            <Overlay isOpen={visibleShippingOverlay} closeOverlay={closeShippingOverlay}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="Street Address Line 1"
                    value={street1}
                    onChange={e => setStreet1(e.target.value)} />
                <br></br>
                <input
                type="text"
                placeholder="Street Address Line 2"
                value={street2}
                onChange={e => setStreet2(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={e => setState(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="Zip code"
                    value={zip}
                    onChange={e => setZip(e.target.value)} />
                <br></br>

                <button onClick={saveNewShippingAddress}>Save shipping address</button>

            </Overlay>

            <Overlay isOpen={visiblePaymentOverlay} closeOverlay={closePaymentOverlay}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <br></br>
                <input
                    type="number"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)} />
                <br></br>
                <input
                type="text"
                placeholder="Expiration Month"
                value={expirationMonth}
                onChange={e => setExpirationMonth(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="Expiration Year"
                    value={expirationYear}
                    onChange={e => setExpirationYear(e.target.value)} />
                <br></br>
                <input
                    type="text"
                    placeholder="cvv"
                    value={cvv}
                    onChange={e => setcvv(e.target.value)} />
                <br></br>
                <button onClick={saveNewPaymentMethod}>Save payment method</button>

            </Overlay>
        </>
    );
}

export default SettingsPage