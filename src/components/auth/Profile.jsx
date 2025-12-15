import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './auth.css'; // Reusing auth styles for consistency

const Profile = () => {
    const { user, login } = useAuth(); // login function can act as an updater if we want, or we can add a specific update function
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setInputs({
                name: user.user_name || '',
                email: user.user_email || '',
                password: '' // Don't pre-fill password for security
            });
        }
    }, [user]);

    const { name, email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const body = { name, email, password };
            const response = await fetch('/auth/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token') // Verify where token is stored. AuthContext usually handles this.
                },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (response.ok) {
                setMessage('Profile updated successfully!');
                // Update local user state via context if possible, or just re-login conceptually
                // Assuming login function updates the state:
                login(localStorage.getItem('token'), parseRes);
                // Clear password field
                setInputs(prev => ({ ...prev, password: '' }));
            } else {
                setError(parseRes.message || 'Update failed');
            }
        } catch (err) {
            console.error(err.message);
            setError('Server Error');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-header">Your Profile</h1>
                {message && <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>{message}</div>}
                {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form className="auth-form" onSubmit={onSubmitForm}>
                    <label style={{ color: '#fff', marginBottom: '5px', display: 'block' }}>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="auth-input"
                        value={name}
                        onChange={onChange}
                        required
                    />
                    <label style={{ color: '#fff', marginBottom: '5px', display: 'block' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="auth-input"
                        value={email}
                        onChange={onChange}
                        required
                    />
                    <label style={{ color: '#fff', marginBottom: '5px', display: 'block' }}>New Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="auth-input"
                        value={password}
                        onChange={onChange}
                    />
                    <button type="submit" className="auth-button">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
