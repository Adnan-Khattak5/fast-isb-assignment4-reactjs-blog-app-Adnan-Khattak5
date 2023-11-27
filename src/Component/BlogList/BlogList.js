import React, { useEffect, useState } from 'react';
import { Form, Button, Pagination, Row, Col } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/usser/posts?page=${currentPage}`);
        const data = response.data;
  
        if (response.status === 200) {
          setBlogPosts(data.blogPosts);
          setTotalPages(data.totalPages);
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
  }, [currentPage]);
  
  

  const handleCommentSubmit = (postId, commentContent) => {
    // Send the comment to the server and update the blog post with the new comment
    // You can implement the logic to send the comment to the server here
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/usser/search?q=${query}`);
      const data = response.data;

      if (response.status === 200) {
        setBlogPosts(data.blogPosts);
        setTotalPages(data.totalPages);
      } else {
        setBlogPosts("No record Match");
        setError(data.message);
      }
    } catch (error) {
      setError('Server Crashed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    handleSearch(searchQuery);
  };

  const handlePageChange = (page) => {
    console.log('Page changed to:', page);
    setCurrentPage(page);
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="centered-container">
        <Form onSubmit={handleSubmit} className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline-success" className="text-light">
            Search
          </Button>
        </Form>
      </div>

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

      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Pagination>
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </>
  );
};

export default BlogList;
