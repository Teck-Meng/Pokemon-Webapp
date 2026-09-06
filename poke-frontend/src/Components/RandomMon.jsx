import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


function RandomMon() {

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top" style = {{paddingLeft: '20px'}}>
          <Navbar.Brand>
            Pokemon Random Teambuilder
          </Navbar.Brand>

          <Nav className="ms-4">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/random-pokemon">
              Random Pokemon
            </Nav.Link>
            <Nav.Link as={Link} to="/random-ability">
              Random Ability
            </Nav.Link>
            <Nav.Link as={Link} to="/random-move">
              Random Move
            </Nav.Link>
            <Nav.Link as={Link} to="/teambuilder">
              Teambuilder
            </Nav.Link>
          </Nav>
      </Navbar>

      <div style={{paddingLeft: '20px', paddingTop: '84px', color: 'black'  }}>
        mons page
      </div>
    </>
  )
}

export default RandomMon