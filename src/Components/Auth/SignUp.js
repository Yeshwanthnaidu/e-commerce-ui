import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { signupSubmit } from "../../actions";
import { useDispatch } from "react-redux";
import { mainSliceActions } from "../../Store/MainSlice";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  // google Auth
  const handleCallbackResponse = (response) => {
    const decoded = jwt_decode(response.credential);
    const userData = {
      name: decoded.name,
      username: decoded.email,
      email: decoded.email,
      password: generatePassword(),
      profileImage: decoded.picture,
    };
    signupSubmit(userData, navigate);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "904622826862-dpd51rk6vaqghctaghfqhh6l9ndevd8t.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "Outline",
      size: "large",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password || !confrimPassword)
      return toast.error("Please Enter all Details", { position: "top-right" });
    if (password !== confrimPassword)
      return toast.error("Password & Confrim Password Not Matching");
    const userData = { name, username, email, password };
    signupSubmit(userData, dispatch);
  };

  return (
    <div className="signup_form">
      <div className="signup_form_Sub">
        <h3>Register</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label>Confrim Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confrim password"
            onChange={(e) => {
              setConfrimPassword(e.target.value);
            }}
          />
        </div>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            onClick={() => {
              navigate("/", { replace: true });
            }}
            className="btn btn-primary"
          >
            close
          </button>
        </div>
        <div
          className="forgot-password text-right mt-3"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            Already Registered?
          </button>
          <div id="signUpDiv"></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
