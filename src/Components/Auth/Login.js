import React, { useEffect, useState } from "react";
import { loginSubmit, oAuthVerification } from "../../actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { mainSliceActions } from "../../Store/MainSlice";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // google Auth
  const handleCallbackResponse = (response) => {
    // const decoded = jwt_decode(response.credential);
    oAuthVerification(response.credential, navigate, dispatch);
  };

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "904622826862-dpd51rk6vaqghctaghfqhh6l9ndevd8t.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "Outline",
      size: "large",
    });
  }, []);

  const clickedCreateNewAcc = () => {
    navigate("/sign-up");
  };

  const closeBtnClicked = () => {
    navigate("/");
  };

  const handleLogin = () => {
    if (!username || !password)
      return toast.error("Please Enter Valid Username and Password");
    const loginData = { username, password };
    loginSubmit(loginData, navigate, dispatch);
  };

  return (
    <div className="signup_form">
      <div className="signup_form_Sub">
        <h3>Login</h3>
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
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Submit
          </button>
          <button onClick={closeBtnClicked} className="btn btn-primary">
            close
          </button>
        </div>
        <p
          className="forgot-password text-right mt-3"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot password?
          </button>
          <button className="btn btn-primary" onClick={clickedCreateNewAcc}>
            Create new Account
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/forgot-username");
            }}
          >
            Forgot Username
          </button>
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div id="signInDiv"></div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
