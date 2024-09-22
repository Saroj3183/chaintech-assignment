import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Register = ({ setView }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        
        setError('');  // it Clear previous errors

        // Check if username or password is empty
        if (username.trim() === '' || password.trim() === '') {
            setError('Please enter both username and password');
            return; // Prevent registration if fields are empty
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user already exists
        if (storedUsers.find(u => u.username === username)) {
            alert('User already exists! Please use a different username.');
            return;
        }

        // Store new user in localstorage
        storedUsers.push({ username, password });
        localStorage.setItem('users', JSON.stringify(storedUsers));

        // Clear fields
        setUsername('');
        setPassword('');
        setError(''); // Ensure error is cleared on success

        // Show success alert and redirect to login
        alert('Registration successful! You can now log in.');
        setView('Login')
        navigate('/Login'); // Redirect to login page
    };

    return (
        <div className="container d-flex">
            <h2>Register</h2>
            {error && <p className="error text-danger mb-2">{error}</p>} {/* Only show error if fields are empty */}
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
            <button className='mt-3 p-2 bg-primary border-none rounded-1 text-white' onClick={handleRegister}>Register</button>
            <button className='mt-1 p-2 bg-primary border-none rounded-1 text-white' onClick={() => navigate('/Login')}>Login</button>
        </div>
    );
};

export default Register;