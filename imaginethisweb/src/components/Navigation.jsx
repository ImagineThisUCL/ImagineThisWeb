import React, {
    Component,
} from 'react'
import NHSLogo from "../images/nhs.jpeg"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import "../css/guidebar.css"


class Navigation extends Component {
    render() {
        return(
            <div className="guide-bar">
                <Navbar collapseOnSelect expand="lg" className="navbar-style" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                          alt="NHS logo"
                          src={NHSLogo}
                          className="d-inline-block align-top"
                          width="70"
                          height="30"
                        />
                    </Navbar.Brand>
                    <Navbar.Text className="navbar-title">
                        Imagine This
                    </Navbar.Text>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="https://imaginethisnhs.github.io/">Getting Started</Nav.Link>
                            <Nav.Link href="https://imaginethisnhs.github.io/guidelines/introduction.html">Guidelines</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown
                              alignRight
                              title="GitHub"
                              id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="https://github.com/tutuchui/ImagineThisWeb">Web App</NavDropdown.Item>
                                <NavDropdown.Item href="https://github.com/tutuchui/ImagineThisServer">Server</NavDropdown.Item>
                                <NavDropdown.Item href="https://github.com/VojtaAdam/ImagineThis-Mobile">Mobile Components</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation