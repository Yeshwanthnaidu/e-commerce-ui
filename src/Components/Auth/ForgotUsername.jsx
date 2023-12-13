import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { forgotUsernameSubmit } from "../../actions";
import { useNavigate } from "react-router-dom";

function ForgotUsername() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeBtnClicked = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (!email) return toast.error("Please Enter Email");
    let response = await forgotUsernameSubmit(email);
    document.getElementById("response_div")?.classList?.add("forgotSuccess");
    document.getElementById("response_div").innerHTML = response.message;
  };

  return (
    <div className="signup_form">
      <div className="signup_form_Sub">
        <h3>Forgot Usernmae</h3>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
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
        <div id="response_div"></div>
      </div>
    </div>
  );
}

export default ForgotUsername;
