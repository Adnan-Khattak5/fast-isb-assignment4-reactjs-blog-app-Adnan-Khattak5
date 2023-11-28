import React, { useEffect, useState } from 'react';
import { Form, Button, Pagination, Row, Col } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        let loginApiEndpoint = "";
        loginApiEndpoint = (`http://localhost:3000/usser/myblog?page=${currentPage}`)
        const response = await fetch(loginApiEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token")
          },
          });
          console.log(response);
          const re = await response.json()
        if (response.status === 200) {
          console.log(re)
          setBlogPosts(re.blogPost);
          setTotalPages(re.totalPages);
        } else {
          setError(error);
        }
      } catch (error) {
        setError('Server error');
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
      const response = await axios.get(`http://localhost:3000/user/search?q=${query}`);
      const data = response.data;

      if (response.status === 200) {
        setBlogPosts(data.blogPosts);
        setTotalPages(data.totalPages);
      } else {
        setBlogPosts([]);
        setError(data.error);
      }
    } catch (error) {
      setError('Server error');
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

  const handleEditBlog = (postId) => {
    // Implement the logic to navigate to the edit blog page or open a modal for editing
    console.log(`Edit blog with ID ${postId}`);
  };

  const handleDeleteBlog = async (postId) => {
    try {
      // Implement the logic to delete the blog post with the given postId
      const response = await axios.delete(`http://localhost:3000/user/posts`, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token")
        },
      });

      if (response.status === 200) {
        // Remove the deleted blog post from the local state
        setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        setError('Failed to delete the blog post');
      }
    } catch (error) {
      setError('Server error');
    }
  };

  const handleAddComment = (postId, commentContent) => {
    // Implement the logic to add a comment to the blog post with the given postId
    // You can send a request to the server to add a comment
  };

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
          <Button type="submit" className="text-light">
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
          {/* Add Edit, Delete, and Add Comment buttons */}
          <div className="action-buttons">
              <Button variant="info" onClick={() => handleEditBlog(post.id)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDeleteBlog(post.id)}>
                Delete
              </Button>
              <Button variant="primary" onClick={() => handleAddComment(post.id, 'Sample comment content')}>
                Add Comment
              </Button>
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
