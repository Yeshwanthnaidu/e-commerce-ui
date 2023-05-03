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
        {loginStatus && <Route path="/sell_your_product" element={<ProductSellingPage />}></Route>}
        {loginStatus && <Route path="/my_ads" element={<MyAds />}></Route>} 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
