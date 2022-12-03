import React from 'react';
import { useState } from 'react';

function LoginPage () {

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    const login = async () => {

        const credentials = { username, password };
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
            <h1>Login</h1>
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
            <button
                onClick={login}
            >Login</button>
        </>
    );
}

export default LoginPage;