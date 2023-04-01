import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

import { useDispatch, useSelector } from "react-redux";
import { mainSliceActions } from "./../Store/MainSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginStatus = useSelector((state) => state.mainSlice.loginStatus);
  const userData = useSelector((state) => state.mainSlice.userData);

  const loginBtnClicked = () => {
    navigate("/login", { replace: true });
  };

  const registerBtnClicked = () => {
    navigate("/sign-up", { replace: true });
  };

  const logoutBtnClicked = () => {
    dispatch(mainSliceActions.logoutUser());
    toast.success("Logout Successful");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <Navbar className="header_styles" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={Logo} alt="plaCart-performace" height="50vh" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="#action1"
              style={{ color: "white", fontWeight: "600" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#action2"
              style={{ color: "white", fontWeight: "600" }}
            >
              Deals
            </Nav.Link>
          </Nav>
          <Form className="d-flex" style={{ marginRight: "8vw" }}>
            <Form.Control
              style={{ width: "40vw" }}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              style={{ backgroundColor: "black" }}
              variant="outline-success"
            >
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </Button>
          </Form>
          {loginStatus && (
            <Button
              style={{
                color: "white",
                backgroundColor: "black",
                width: "11vw",
                marginLeft: "-80px",
              }}
              onClick={() => {
                // dispatch(mainSliceActions.showsellingModal(true));
                navigate('/sell_your_product', {replace: true})
              }}
              variant="outline-success"
            >
              {" "}
              <FontAwesomeIcon icon="fa-solid fa-rectangle-ad" /> Sell your
              Product
            </Button>
          )}
          {loginStatus && (
            <div style={{ margin: "10px" }} className="btn-group">
              <button
                type="button"
                style={{ color: "white", border: "1px solid #ccc" }}
                className="btn"
              >
                {" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-user"
                  style={{ marginRight: "5px" }}
                />{" "}
                Hey,
                {userData && userData.name ? userData.name.slice(0, 9) : "User"}
              </button>
              <button
                type="button"
                style={{ color: "white", border: "1px solid #ccc" }}
                className="btn dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  {" "}
                  <FontAwesomeIcon
                    icon="fa-solid fa-cart-shopping"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  Shopping Cart
                </a>
                <a className="dropdown-item" href="#">
                  {" "}
                  <FontAwesomeIcon
                    icon="fa-solid fa-box-open"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  Orders
                </a>
                <a className="dropdown-item" href="#">
                  {" "}
                  <FontAwesomeIcon
                    icon="fa-solid fa-pen-to-square"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  Wish List
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <FontAwesomeIcon
                    icon="fa-solid fa-ban"
                    style={{ color: "red", marginRight: "5px" }}
                  />
                  Cancel/Return
                </a>
              </div>
            </div>
          )}
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!loginStatus ? (
              <>
                <Nav.Link
                  variant="outline-none"
                  onClick={loginBtnClicked}
                  style={{ color: "white", fontWeight: "600" }}
                >
                  Login
                </Nav.Link>
                <Button
                  variant="outline-none"
                  onClick={registerBtnClicked}
                  style={{ color: "white", fontWeight: "600" }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-none"
                  onClick={logoutBtnClicked}
                  style={{
                    border: "1px solid #ccc",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    icon="fa-solid fa-right-from-bracket"
                    style={{ color: "red", marginRight: "5px" }}
                  />
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
