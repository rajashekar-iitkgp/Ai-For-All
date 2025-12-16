import React, { useState, useEffect } from 'react';
import Article from '../../components/article/Article';
import { blog01, blog02, blog03, blog04, blog05 } from './imports';
import './blog.css';
import { useAuth } from '../../context/AuthContext';
import EditBlogModal from './EditBlogModal';

// Map DB image strings to imported assets
const imageMap = {
  "blog01": blog01,
  "blog02": blog02,
  "blog03": blog03,
  "blog04": blog04,
  "blog05": blog05
};

const Blog = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch('/blogs', {
        headers: { token: localStorage.getItem('token') }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  const handleSave = async (id, title, content) => {
    try {
      const response = await fetch(`/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({ title, content })
      });

      if (response.ok) {
        setEditingBlog(null);
        fetchBlogs(); // Refresh list
      } else {
        alert("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (!user) {
    return (
      <div className="gpt3__blog section__padding" id="blog">
        <div className="gpt3__blog-heading">
          <h1 className="gradient__text">Please Log In to view our latest AI Insights.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="gpt3__blog section__padding" id="blog">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">A lot is happening, <br /> We are blogging about it.</h1>
      </div>

      {loading ? <p style={{ color: 'white' }}>Loading articles...</p> : (
        <div className="gpt3__blog-container">
          <div className="gpt3__blog-container_groupA">
            {blogs.length > 0 && (
              <Article
                imgUrl={imageMap[blogs[0].image_url] || blog01}
                date={new Date(blogs[0].created_at).toDateString()}
                text={blogs[0].title}
                isAdmin={user.role === 'admin'}
                onEdit={() => setEditingBlog(blogs[0])}
                id={blogs[0].blog_id}
              />
            )}
          </div>
          <div className="gpt3__blog-container_groupB">
            {blogs.slice(1).map((blog) => (
              <Article
                key={blog.blog_id}
                imgUrl={imageMap[blog.image_url] || blog02}
                date={new Date(blog.created_at).toDateString()}
                text={blog.title}
                isAdmin={user.role === 'admin'}
                onEdit={() => setEditingBlog(blog)}
                id={blog.blog_id}
              />
            ))}
          </div>
        </div>
      )}

      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={() => setEditingBlog(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Blog;
