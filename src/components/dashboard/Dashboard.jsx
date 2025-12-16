import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            // 1. Create Order
            const response = await fetch('/payments/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                }
            });
            const orderData = await response.json();
            console.log("DEBUG: Order Data from Backend:", orderData);

            // 2. Open Razorpay
            const options = {
                key: orderData.key_id,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Ai-For-All",
                description: "Pro Subscription",
                order_id: orderData.order_id,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await fetch('/payments/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                token: localStorage.getItem('token')
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });
                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            alert("Payment Successful!");
                            window.location.reload(); // To refresh status (or you can trigger state update)
                        } else {
                            alert("Payment Failed Verification");
                        }
                    } catch (e) {
                        console.error("Verification Error", e);
                    }
                },
                prefill: {
                    name: user.user_name,
                    email: user.user_email,
                },
                theme: {
                    color: "#AE67FA"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (err) {
            console.error("Payment Error:", err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container section__padding">
            <div className="dashboard-header">
                <h1>Welcome Back, {user ? user.user_name : 'User'}!</h1>
                <p>Manage your AI journey from here.</p>

                {location.search.includes('payment=success') && (
                    <div style={{ background: '#4CAF50', color: 'white', padding: '1rem', borderRadius: '5px', marginTop: '1rem' }}>
                        🎉 Thank you for subscribing to Pro!
                    </div>
                )}
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

                {/* Pro Plan Card */}
                <div className="dashboard-card" style={{ border: '1px solid #AE67FA' }}>
                    <div>
                        <h3>Pro Plan</h3>
                        <p>Unlock advanced AI models, faster speeds, and priority support.</p>
                    </div>
                    <button
                        className="dashboard-btn"
                        onClick={(e) => { e.stopPropagation(); handleUpgrade(); }}
                        style={{ background: '#AE67FA' }}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Upgrade to Pro ($9.99/mo)'}
                    </button>
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
