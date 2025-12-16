import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { blog01, blog02, blog03, blog04, blog05 } from './imports';
import './blogDetails.css';

// Map DB image strings to imported assets
const imageMap = {
    "blog01": blog01,
    "blog02": blog02,
    "blog03": blog03,
    "blog04": blog04,
    "blog05": blog05
};

const BlogDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            // If checking user auth takes time, wait or handle gracefully (user might be null initially)
            // But we can depend on token presence for fetch
            try {
                const response = await fetch(`/blogs/${id}`, {
                    headers: { token: localStorage.getItem('token') }
                });

                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                } else {
                    console.error("Failed to fetch blog");
                    // Optionally navigate to 404 or show error
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (!user) {
        return (
            <div className="gpt3__blog-details section__padding">
                <h1 className="gradient__text">Please Log In to view this article.</h1>
                <button className="blog-back-btn" onClick={() => navigate('/login')}>Login</button>
            </div>
        );
    }

    if (loading) return <div className="gpt3__blog-details section__padding"><p style={{ color: 'white' }}>Loading...</p></div>;

    if (!blog) return <div className="gpt3__blog-details section__padding"><p style={{ color: 'white' }}>Article not found.</p></div>;

    return (
        <div className="gpt3__blog-details section__padding">
            <button className="blog-back-btn" onClick={() => navigate(-1)}>← Back</button>

            <div className="gpt3__blog-details-header">
                <h1 className="gradient__text">{blog.title}</h1>
                <p>{new Date(blog.created_at).toDateString()}</p>
            </div>

            <div className="gpt3__blog-details-image">
                <img src={imageMap[blog.image_url] || blog01} alt="blog cover" />
            </div>

            <div className="gpt3__blog-details-content">
                {blog.content.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default BlogDetails;
