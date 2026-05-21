import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // SIMPLE DEMO LOGIN
    if (username && password) {

      // Redirect to Home page
      navigate("/home");

    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1 className="logo">
          EduCompass
        </h1>

        <p className="subtitle">
          Login to your account
        </p>

        <form onSubmit={handleLogin}>

          {/* USERNAME */}
          <div className="input-group">

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          {/* PASSWORD */}
          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {/* OPTIONS */}
          <div className="options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="/">
              Forgot Password?
            </a>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        {/* REGISTER */}
        <p className="register-text">

          Don&apos;t have an account?

          <a href="/register">
            {" "}Register
          </a>

        </p>

      </div>

    </div>
  );
}

export default Login;