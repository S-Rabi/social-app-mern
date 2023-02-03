import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { SocialContext } from "../../context/Context";
import { useContext } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";
import "./Navbar.css";

function OffcanvasExample() {
  const { state, dispatch } = useContext(SocialContext);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  console.log("state.id", state.user._id);

  const handleLogOut = async () => {
    const response = await axios.get(baseUrl + "/users/logout", {
      withCredentials: true,
    });

    if (response.status === 200) {
      alert("You are logged out");
      dispatch({
        type: "logout",
      });
    } else {
      console.log("error logging in");
    }
  };
  return (
    <>
      {["xl"].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          className="mb-0 gradient-nav"
        >
          <Container fluid>
            <Navbar.Brand href="#" className="text-black  ">
              Social-App
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="navbar-toggle
            "
            >
              <i className="fa-solid fa-bars"></i>
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Social-App
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>
                    <NavLink to="/home">Home</NavLink>
                  </Nav.Link>
                  {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                  <NavDropdown
                    title="Settings"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item>
                      <NavLink to="/profile">Edit Profile</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to="/viewprofile/myprofile">
                        View Profile
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <NavLink to="settings">Account Settings</NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  {/* <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  /> */}
                  <NavLink to="/">
                    {state.user._id ? (
                      <Button onClick={handleLogOut} variant="outline-warning">
                        Log/Out
                      </Button>
                    ) : (
                      <Button variant="outline-warning">Log/In</Button>
                    )}
                  </NavLink>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
export default OffcanvasExample;
