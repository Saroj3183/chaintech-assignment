import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser, setView }) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Validate if fields are empty
        if (!username || !password) {
            setError('Please enter both username and password');
            return; // Prevent further execution if fields are empty
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(u => u.username === username && u.password === password);
        if (user) {
            setUser(user);
            alert('Login successful!'); // Success alert
            setView('account');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container d-flex">
            <h2>Login</h2>
            {error && <p className="error text-danger mb-2">{error}</p>}
            <input
            className='p-2'
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
            className='mt-2 p-2'
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button className='mt-3 p-2 bg-primary border-none rounded-1 text-white' onClick={handleLogin}>Login</button>
            <button className='mt-1 p-2 bg-primary border-none rounded-1 text-white' onClick={() => navigate('/Register')}>Register</button>
            <button className='mt-1 p-2 bg-primary border-none rounded-1 text-white' onClick={() => navigate('/Account')}>Account</button> 
        </div>
    );
};

export default Login;