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
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: username, email, password })
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
        <div className="profile-container">
            <h2>Profile Page</h2>
            <form onSubmit={handleUpdateProfile} className="profile-form">
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <label>New Password :</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Confirm New Password :</label>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit">Update Profile</button>
            </form>
            <MessageBox message={message} onClose={() => setMessage('')} />
        </div>
    );
};

export default ProfilePage;
