import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="navbar"
    >
      <Container>
        <Navbar.Brand href="#home" className="brandName">
          E-Commerce
        </Navbar.Brand>
        <form className="searchInputForm">
          <input placeholder="Search for any product" />
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbarHamburger"
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="nav__links">
            <Nav.Link href="">
              <i className="fa-solid fa-user-plus navFaIcon"></i>
              Login
            </Nav.Link>
            <Nav.Link href="">
              <i className="fa-solid fa-heart navFaIcon"></i>Wishlist
            </Nav.Link>
            <Nav.Link eventKey={2} href="">
              <i className="fa-solid fa-cart-shopping navFaIcon"></i>
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
