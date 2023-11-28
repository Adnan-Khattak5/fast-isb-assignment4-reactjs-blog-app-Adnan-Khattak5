import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa'; // Import Font Awesome icons
import { RiLogoutBoxRLine } from 'react-icons/ri'; // Import logout icon

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-primary text-light">
      <Nav.Link className="text-light me-5" as={Link} to="/user/posts">
        <h1> Blogistan </h1>
        </Nav.Link>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          {/* Other Nav Links (if any) */}
        </Nav>
        
        {/* Notifications with Bell Icon */}
        <Nav.Link className="text-light me-5" as={Link} to="/notifications">
          <FaBell /> Notifications
        </Nav.Link>

        {/* Profile Settings with User Icon */}
        <Nav.Link className="text-light me-5" as={Link} to="/profile">
          <FaUser /> Profile
        </Nav.Link>

        {/* Logout with Logout Icon */}
        <Nav.Link className="text-light me-2" as={Link} to="/logout">
          <RiLogoutBoxRLine /> Logout
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
