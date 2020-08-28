import React, {
    Component,
} from 'react'
import Logo from "../images/ImagineThisLogo.png"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import "../css/guidebar.css"


class Navigation extends Component {
    render() {
        return(
            <div className="guide-bar">
                <Navbar collapseOnSelect expand="lg" className="navbar-style" variant="dark">
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
                        <Nav className="mr-auto">
                            <Nav.Link href="https://imaginethisucl.github.io/getting%20started/how%20to%20use.html">Get Started</Nav.Link>
                            <Nav.Link href="https://imaginethisucl.github.io/guidelines/design%20introduction.html">Guidelines</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown
                              alignRight
                              title="GitHub"
                              id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisWeb">Web App</NavDropdown.Item>
                                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThisServer">Server</NavDropdown.Item>
                                <NavDropdown.Item href="https://github.com/ImagineThisUCL/ImagineThis-Mobile">Mobile Components</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation