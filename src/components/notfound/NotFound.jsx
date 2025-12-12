import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

const NotFound = () => {
    return (
        <div className="gpt3__notfound section__padding">
            <div className="gpt3__notfound-content">
                <h1 className="gradient__text">404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for does not exist or has been moved.</p>
                <div className="gpt3__notfound-btn">
                    <Link to="/">Go Back Home</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
