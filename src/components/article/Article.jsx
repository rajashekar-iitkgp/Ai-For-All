import React from 'react';
import './article.css';
// Re-saving to ensure HMR picks up the fix
import { Link } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';

const Article = ({ imgUrl, date, text, onEdit, isAdmin, id }) => (
  <div className="gpt3__blog-container_article">
    <div className="gpt3__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="gpt3__blog-container_article-content">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <p>{date}</p>
          {isAdmin && <BsPencilSquare style={{ cursor: 'pointer', color: '#fff' }} onClick={onEdit} />}
        </div>
        <h3>{text}</h3>
      </div>
      <p><Link to={`/blog/${id}`}>Read Full Article</Link></p>
    </div>
  </div>
);

export default Article;
