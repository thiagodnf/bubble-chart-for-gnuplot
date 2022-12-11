import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Component() {

    return (
        <Navbar expand="lg" className="navbar-dark-theme" fixed="top">
            <Navbar.Brand href="#home">Bubble Chart for Gnuplot</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Examples</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" id="btn-example-one-quadrant">One Quadrant</a>
                            <a className="dropdown-item" href="#" id="btn-example-two-quadrants">Two Quadrants</a>
                            <a className="dropdown-item" href="#" id="btn-example-four-quadrants">Four Quadrants</a>
                        </div>
                    </li>
                </Nav>
                <Form className="d-flex">
                    <a className="btn btn-success" target="_blank" href="https://github.com/thiagodnf/bubble-chart-for-gnuplot">Contribute</a>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Component;
