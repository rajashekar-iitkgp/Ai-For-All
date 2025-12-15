import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="gradient__text">Hello, {user?.user_name || 'Explorer'}</h1>
                <p>Welcome to your personal control center. What would you like to do today?</p>
            </div>

            <div className="dashboard-grid">
                {/* Profile Card */}
                <div className="dashboard-card" onClick={() => navigate('/profile')}>
                    <div>
                        <h3>My Profile</h3>
                        <p>Update your personal details, change your password, and manage your account settings.</p>
                    </div>
                    <button className="dashboard-btn">Manage Profile</button>
                </div>

                {/* GPT-3 Card */}
                <div className="dashboard-card" onClick={() => navigate('/what-gpt3')}>
                    <div>
                        <h3>Explore GPT-3</h3>
                        <p>Dive deep into the world of Generative Pre-trained Transformer 3 and understand its capabilities.</p>
                    </div>
                    <button className="dashboard-btn">Learn More</button>
                </div>

                {/* Features Card */}
                <div className="dashboard-card" onClick={() => navigate('/features')}>
                    <div>
                        <h3>Case Studies</h3>
                        <p>See real-world examples of how AI is transforming industries and creating new possibilities.</p>
                    </div>
                    <button className="dashboard-btn">Read Studies</button>
                </div>

                {/* Blog Card */}
                <div className="dashboard-card" onClick={() => navigate('/blog')}>
                    <div>
                        <h3>Latest Updates</h3>
                        <p>Stay updated with the latest news and articles from the Ai-For-All team.</p>
                    </div>
                    <button className="dashboard-btn">Read Blog</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
