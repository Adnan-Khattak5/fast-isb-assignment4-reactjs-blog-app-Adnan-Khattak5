import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-primary text-light">
      <Container fluid>
      {/* Hello */}
        <Navbar.Brand><span className="font-weight-bold text-white display-5">Blogistan</span></Navbar.Brand>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="text-light">Home</Nav.Link>
            <Nav.Link className="text-light">Link</Nav.Link>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="text-light">Search</Button>
          </Form> */}
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;