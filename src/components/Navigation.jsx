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
import api from "../api";
import { useHistory } from "react-router";
import { FeedbackContext } from "../contexts/feedback-context";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

/*
 * Top navigation containing links to all external pages
 */
class Navigation extends Component {
  static contextType = FeedbackContext;
  constructor(props) {
    super(props);
    this.state = { value: "", projectExists: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      projectExists: this.context.projectExists,
    });
  }

  /**
   * This function will query the project details and update global state accordingly
   */
  handleSubmit(event) {
    const { value } = this.state;
    const [context, dispatch] = this.context;
    // check if project ID exist
    const url = `/projects/${value}`;
    api
      .get(url)
      .then((res) => {
        dispatch({
          type: "SET_PROJECT_EXISTS",
          payload: true,
        });
        // set project name
        dispatch({
          type: "SET_PROJECT_NAME",
          payload: res.data.projectName,
        });
        // set project ID
        dispatch({
          type: "SET_PROJECT_ID",
          payload: value,
        });
        this.props.history.push(`/project/${value}`);
        // window.location.href = `/project/${value}`;
      })
      .catch((error) => {
        console.log({ error });
        this.setState({ projectExists: false });
        dispatch({
          type: "SET_PROJECT_EXISTS",
          payload: false,
        });
      });
    dispatch({
      type: "SET_PROJECT_ID",
      payload: value,
    });
    event.preventDefault();
  }

  render() {
    // const context = this.context;
    // console.log(context);
    return (
      <>
        <div className="guide-bar">
          <Navbar
            collapseOnSelect
            expand="lg"
            className="navbar-style"
            variant="dark"
          >
            <Navbar.Brand as={Link} to="/" className="navbar-brand">
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
                  <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisDatabase">
                    Database
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisSystem">
                    System
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisExpo">
                    Expo
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
                      <Button
                        variant="btn btn-light search-button"
                        type="submit"
                      >
                        <img alt="search button" src={Search} />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        {this.state.projectExists === false && (
          <Alert variant="danger">
            The project with ID{" "}
            <Alert.Link href="/notfound">{this.state.value}</Alert.Link> is not
            in our database. Please make sure you have converted it first.
          </Alert>
        )}
      </>
    );
  }
}

export default Navigation;
