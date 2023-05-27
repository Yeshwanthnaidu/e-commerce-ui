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
import { useState, useEffect } from "react";
import { getAllProducts } from "../actions";

import UserProfileModal from "./Auth/Modals/UserProfileModal";

import { FormControl, InputGroup } from "react-bootstrap";

function Header() {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProductData] = useState([]);
  const showSearchOptions = useSelector((state) => state.mainSlice.showSearchOptions);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginStatus = useSelector((state) => state.mainSlice.loginStatus);
  const userData = useSelector((state) => state.mainSlice.userData);

  useEffect(() => {
    const getProductData = async () => {
      setProductData(await getAllProducts())
    }
    getProductData();
  }, [])

  useEffect(() => {

  }, [searchTerm])

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

  const myAdsBtnCLicked = () => {
    if (loginStatus) {
      navigate("/my_ads");
    } else {
      navigate("/login");
    }
  };

  const profileBtnClicked = () => {
    if (loginStatus) {
      setShowUserProfile(true)
    } else {
      navigate('/login')
    }
  }

  const showCartBtnClicked = () => {
    if (loginStatus) {
      navigate('/show_cart')
    } else {
      navigate('/login')
    }
  }

  const handleSearchFromDrodown = async (productData) => {
    setSearchTerm(productData.product_name)
    dispatch(mainSliceActions.showSearchOptions(false))
    navigate(`/search/${productData.product_name}`)
  }

  return (
    <div>
      <Navbar className="header_styles" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={Logo} alt="plaCart-performace" height="50vh" onClick={() => navigate('/')} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                href="/"
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
            <Form className="d-flex" style={{ marginLeft: '10px', marginRight: "7vw" }}>
              <Form.Control
                style={{ width: "38vw", borderRadius: '0px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}
                value={searchTerm.slice(0, 70)}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => { setSearchTerm(e.target.value), dispatch(mainSliceActions.showSearchOptions(true)) }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                    e.preventDefault();
                    dispatch(mainSliceActions.showSearchOptions(false))
                    navigate(`/search/${searchTerm}`)
                  }
                }
                }
              />
              <button style={{
                fontSize: '20px',
                fontWeight: '600',
                ZIndex: '100',
                color: 'black',
                cursor: 'pointer',
                marginLeft: '-8px',
                borderRadius: '0px 12px 12px 0px',
                background: 'white',
                border: 'none',
                marginRight: '10px',
                width: '35px'
              }}
                onClick={(e) => { e.preventDefault(), setSearchTerm('') }} >
                X
              </button>
              {products && products.length && searchTerm !== '' && showSearchOptions ?
                <div style={{ width: '40vw', position: 'absolute', top: '50px', zIndex: '10', background: 'white', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                  {products.filter((product) => {
                    const formattedTitle = product.product_name.toLowerCase().split(' ');
                    const formattedQuery = searchTerm.toLowerCase().split(' ');
                    const isPartialMatch = (formattedQuery.every(word => formattedTitle.includes(word)) ||
                      formattedTitle.some(word => word.toLowerCase().includes(searchTerm.trim().split(' ').slice(-1)[0].toLowerCase()) && word.startsWith(searchTerm.trim().split(' ').slice(-1)[0].toLowerCase()[0])))

                    const query = searchTerm.toLowerCase().replace(/\s/g, '').split('')
                    const productCategory = product.product_type.toLowerCase().replace(/\s/g, '').split('')

                    if (searchTerm.split(' ').slice(0, -1).length >= 1) {
                      return (searchTerm.split(' ').slice(0, -1).every(word => formattedTitle.includes(word)) && isPartialMatch) || query.every(letter => productCategory.includes(letter))
                    }


                    return isPartialMatch || query.every(letter => productCategory.includes(letter))
                  }).slice(0, 7).map(productData => {
                    return <div onClick={() => handleSearchFromDrodown(productData)}
                      style={{ background: '#E5E5E5', color: 'black', width: '99%', float: 'left', margin: '3px', padding: '5px', cursor: 'pointer' }}>{productData.product_name.slice(0, 70) + `${productData.product_name.length > 70 ? '...' : ''}`}</div>
                  })}
                </div>
                : null}
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
                  navigate('/sell_your_product', { replace: true })
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
                  onClick={profileBtnClicked}
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
                  <Button className="dropdown-item" onClick={myAdsBtnCLicked}>
                    <FontAwesomeIcon
                      icon="fas fa-ad"
                      style={{ marginRight: "8px" }}
                    />
                    My Ads
                  </Button>
                  <Button className="dropdown-item" onClick={showCartBtnClicked}>
                    {" "}
                    <FontAwesomeIcon
                      icon="fa-solid fa-cart-shopping"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Shopping Cart
                  </Button>
                  <a className="dropdown-item" href="#">
                    {" "}
                    <FontAwesomeIcon
                      icon="fa-solid fa-box-open"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Orders
                  </a>
                  <Button className="dropdown-item" onClick={() => { navigate('/show_wishlist') }}>
                    {" "}
                    <FontAwesomeIcon
                      icon="fa-solid fa-pen-to-square"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Wish List
                  </Button>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <FontAwesomeIcon
                      icon="fa-solid fa-ban"
                      style={{ color: "red", marginRight: "5px" }}
                    />
                    Cancel/Return
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=yeshwanth.ch.naidu@gmail.com" target='_blank'>
                    <FontAwesomeIcon icon="fa-solid fa-user-shield" style={{ marginRight: "5px" }} />
                    Customer Service
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
      {showUserProfile && <UserProfileModal setShowUserProfile={setShowUserProfile} />}
    </div>
  );
}

export default Header;
