import React, { useState } from 'react';
import './editBlogModal.css';

const EditBlogModal = ({ blog, onClose, onSave }) => {
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(blog.blog_id, title, content);
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-content">
                <h2>Edit Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlogModal;
