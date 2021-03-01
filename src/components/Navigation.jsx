import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "../css/guidebar.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Logo from "../assets/ImagineThisLogo.png";
import Search from "../assets/Search.svg";
import api from '../api';
import { useHistory } from "react-router";

/*
 * Top navigation containing links to all external pages
 */
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    // check if project ID exist
    const url = `/projects/${value}`;
    api
      .get(url)
      .then((res) => {
        // window.location.href = `/project/${value}`;
        this.props.history.push(`/project/${value}`);
      })
      .catch((error) => {
        console.log({ error });
        if (error.response.status === 404) {
          // project Not found, pop an alert
          window.alert("Project ID not found!")
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="guide-bar">
        <Navbar
          collapseOnSelect
          expand="lg"
          className="navbar-style"
          variant="dark"
        >
          <Navbar.Brand href="/" className="navbar-brand">
            <img
              alt="Imagine This logo"
              src={Logo}
              className="d-inline-block align-top"
              width="165"
              height="30"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <Nav.Link href="https://imaginethisucl.github.io/getting%20started/how%20to%20use.html">
                Get Started
              </Nav.Link>
              <Nav.Link href="https://imaginethisucl.github.io/guidelines/design%20introduction.html">
                Guidelines
              </Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <NavDropdown
                alignRight
                title="GitHub"
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisWeb">
                  Web App
                </NavDropdown.Item>
                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisServer">
                  Server
                </NavDropdown.Item>
                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThis-Mobile">
                  Mobile Components
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <Form
                onSubmit={this.handleSubmit}
                className="input-group navbar-group"
              >
                <InputGroup className="input-group-prepend">
                  <FormControl
                    className="form-control navbar-input"
                    aria-describedby="basic-addon1"
                    placeholder="Find Project With ID"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <InputGroup.Append>
                    <Button variant="btn btn-light search-button" type="submit">
                      <img alt="search button" src={Search} />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
