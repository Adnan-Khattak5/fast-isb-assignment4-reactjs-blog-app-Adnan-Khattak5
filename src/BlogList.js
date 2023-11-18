import React, { useEffect, useState } from 'react';
import './App.css';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/usser/posts');
        const data = await response.json();

        if (response.ok) {
          setBlogPosts(data.blogPosts);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Server Crashed');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleCommentSubmit = (postId, commentContent) => {
    // Send the comment to the server and update the blog post with the new comment
    // You can implement the logic to send the comment to the server here
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="blog-container">
      {blogPosts.map((post) => (
        <div className="blog-post" key={post.id}>
          <h2 className="blog-post-title">{post.title}</h2>
          <p className="blog-post-content">{post.content}</p>
          <p className="blog-post-author">Author: {post.author}</p>
          <p className="blog-post-description">{post.description}</p>
          <div className="tags-section">
            <h3>Tags</h3>
            {post.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment">
                {/* <p className="comment-author">{comment.author}</p> */}
                <p className="comment-content">{comment.comment}</p>
              </div>
            ))}
            <div className="comment-box">
              <input type="text" placeholder="Add a comment..." />
              <button
                onClick={() =>
                  handleCommentSubmit(post.id, 'Sample comment content')
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList; 