import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CreateAccountPage () {

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [name, setName] = useState([]);
    const [emailaddress, setEmailaddress] = useState([]);
    const [phonenumber, setPhonenumber] = useState([]);
    const [address, setAddress] = useState([]);

    const history = useHistory();

    const createaccount = async () => {

        const credentials = { username, password, name, emailaddress, phonenumber, address };
        const response = await fetch('/api/token/', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        const accessToken = data.access;
        const refreshToken = data.refresh;
        if(response.status === 201){
            alert("Successfully logged in!");
        } else {
            alert(`Failed to login, status code = ${response.status}, accessToken = ${accessToken}, refreshToken = ${refreshToken}`);
        }
  
      };

    return (
        <>
            <h1>Create an Account</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)} />
              <br></br>
            <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
              <br></br>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)} />
              <br></br>
              <input
                type="text"
                placeholder="Email Address"
                value={emailaddress}
                onChange={e => setEmailaddress(e.target.value)} />
              <br></br>
              <input
                type="text"
                placeholder="Phone number"
                value={phonenumber}
                onChange={e => setPhonenumber(e.target.value)} />
              <br></br>
              <input
                type="text"
                placeholder="Name"
                value={address}
                onChange={e => setAddress(e.target.value)} />
              <br></br>
            <button
                onClick={createaccount}
            >Create Account</button>
        </>
    );
}

export default CreateAccountPage;