import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Component() {

    return (
        <Navbar expand="lg" className="navbar-dark-theme" fixed="top">
            <Navbar.Brand href="#home">Bubble Chart for Gnuplot</Navbar.Brand>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Nav className="mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Examples</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" id="btn-example-one-information">One Information</a>
                            <a className="dropdown-item" href="#" id="btn-example-two-information">Two Information</a>
                        </div>
                    </li>
                </Nav>
                <Form inline>
                    <a className="btn btn-success" target="_blank" href="https://github.com/thiagodnf/bubble-chart-for-gnuplot">Contribute</a>
                </Form>
            </div>
        </Navbar>
    );
}

export default Component;
