import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Home from "./Home.js";
import Signup from "./Components/Auth/SignUp.js";
import Login from "./Components/Auth/Login.js";
import ForgotPassword from "./Components/Auth/ForgotPassword.js";
import ForgotUsername from "./Components/Auth/ForgotUsername.js";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";

import ProductSellingPage from "./Components/Product/ProductSelling.js";
import MyAds from "./Components/HeaderOptions/MyAds.js";
import ViewProduct from "./Components/Product/ViewProduct.js";
import ViewCart from "./Components/HeaderOptions/ViewCart.js";
import ViewWishlist from "./Components/HeaderOptions/ViewWishlist.js";
import SearchResult from "./Components/Search/SearchResult.js";
import BookOrder from "./Components/Bookings/BookOrder.js";

import OrderPlaced from "./Components/Bookings/OrderPlaced.js";

import YourOrders from "./Components/Bookings/YourOrders.js";

function App() {
  const loginStatus = useSelector(state => state.mainSlice.loginStatus)

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/forgot-username" element={<ForgotUsername />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path='/view_product/:id' element={<ViewProduct />}></Route>
        <Route path='/search/:query' element={<SearchResult />}></Route>
        {loginStatus && <Route path="/sell_your_product" element={<ProductSellingPage />}></Route>}
        {loginStatus && <Route path="/my_ads" element={<MyAds />}></Route>}
        {loginStatus && <Route path='/show_cart' element={<ViewCart />}></Route>}
        {loginStatus && <Route path='/show_wishlist' element={<ViewWishlist />}></Route>}
        {loginStatus && <Route path='/your_orders' element={<YourOrders />}></Route>}
        {loginStatus && <Route path='/book_now/:id' element={<BookOrder />}></Route>}
        {loginStatus && <Route path='/order_placed/:id' element={<OrderPlaced />}></Route>}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
