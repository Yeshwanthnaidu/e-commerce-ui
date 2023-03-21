import Home from "./Home.js";
import Signup from "./Components/Auth/SignUp.js";
import Login from "./Components/Auth/Login.js";
import ForgotPassword from "./Components/Auth/ForgotPassword.js";
import { useSelector } from "react-redux";
import ForgotUsername from "./Components/Auth/ForgotUsername.js";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header.js";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/forgot-username" element={<ForgotUsername />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
