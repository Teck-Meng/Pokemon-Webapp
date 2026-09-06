import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Home() {

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top" style = {{paddingLeft: '20px'}}>
          <Navbar.Brand href="#home">
            Pokemon Random Teambuilder
          </Navbar.Brand>

          <Nav className="ms-4">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#mon">Random Pokemon</Nav.Link>
            <Nav.Link href="#ability">Random Ability</Nav.Link>
            <Nav.Link href="#move">Random Move</Nav.Link>
            <Nav.Link href="#teambuilder">Teambuilder</Nav.Link>
          </Nav>
      </Navbar>

      <div style={{paddingLeft: '20px', paddingTop: '84px', color: 'black'  }}>
        About this app thingy
      </div>
    </>
  )
}

export default Home