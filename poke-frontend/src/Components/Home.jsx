import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';


function Home() {

  return (
    <>
      <Header page_name="Home"></Header>
      <div style={{paddingLeft: '20px', paddingTop: '84px', color: 'black'  }}>
        About this app thingy
      </div>
    </>
  )
}

export default Home