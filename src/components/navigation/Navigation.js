import React, { Component } from 'react';
import {Navbar,Nav,Form,Button,FormControl} from "react-bootstrap";


export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/admin">Admin</Nav.Link>
                <Nav.Link href="/customer">Customer</Nav.Link>
                <Nav.Link href="/product">Product</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        )
    }
}