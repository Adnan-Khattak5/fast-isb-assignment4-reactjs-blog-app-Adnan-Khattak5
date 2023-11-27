import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-primary text-light">
      <Container fluid>
      {/* Hello */}
        <Navbar.Brand><span className="font-weight-bold text-white display-5" style={{ fontFamily: 'Times New Roman', fontSize: '48px' }}>Blogistan</span></Navbar.Brand>
          <Nav
            className="ml-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/login" className="text-light" style={{ fontFamily: 'Times New Roman', fontSize: '24px' }}>Login</Nav.Link>
            <Nav.Link as={Link} to="/signup" className="text-light" style={{ fontFamily: 'Times New Roman', fontSize: '24px' }}>Signup</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;