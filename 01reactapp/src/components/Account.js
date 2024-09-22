import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Account = ({ user, setUser, setView }) => {

    const navigate=useNavigate('')

  const [newUsername, setNewUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState(user.password);

  useEffect(() => {
    setNewUsername(user.username);
    setNewPassword(user.password);
  }, [user]);

  const handleUpdate = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(u => {
      if (u.username === user.username) {
        return { ...u, username: newUsername, password: newPassword };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ username: newUsername, password: newPassword });
    alert('Account updated successfully!'); // Success alert
  };

  const handleLogout = () => {
    setUser(null);
    alert('Logout successful!'); // Success alert
    setView('login');
    navigate('/Login')
  };

  return (
    <div className="container d-flex">
      <h2>Account Information</h2>
      <input
      className='p-2'
        type="text"
        value={newUsername}
        onChange={e => setNewUsername(e.target.value)}
      />
      <input
      className='mt-2 p-2'
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <button className='mt-3 p-2 bg-primary border-none rounded-1 text-white' onClick={handleUpdate}>Update</button>
      <button className='mt-1 p-2 bg-primary border-none rounded-1 text-white' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;