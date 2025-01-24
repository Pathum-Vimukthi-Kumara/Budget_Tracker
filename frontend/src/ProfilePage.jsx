import React, { useState } from 'react';
import './ProfilePage.css';
import MessageBox from './MessageBox';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3011/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="SignUp"
    style={{
      width: '100vw',
      height: '100vh',
      backgroundColor:'#EBF5FB',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/bg.png'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // ✅ Prevents background scrolling
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    
  }}
>
    <div className="profile-page">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-card">
        <form onSubmit={handleUpdateProfile} className="profile-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank if you don't want to change"
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
            />
          </div>

          <button type="submit" className="update-button">
            Update Profile
          </button>
        </form>
      </div>

      {/* MessageBox for success/error messages */}
      <MessageBox message={message} onClose={() => setMessage('')} />
    </div>
    </div>
  );
};

export default ProfilePage;
