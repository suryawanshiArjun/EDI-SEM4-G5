import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-container">

      <div className="register-box">

        <h1 className="register-logo">
          Register
        </h1>

        <p className="register-subtitle">
          Create your EduCompass account
        </p>

        <form>

          <div className="register-input-group">
            <input
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="register-input-group">
            <input
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="register-input-group">
            <input
              type="email"
              placeholder="Email Address"
            />
          </div>

          <div className="register-input-group">
            <input
              type="text"
              placeholder="Mobile Number"
            />
          </div>

          <div className="register-input-group">
            <input
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="register-input-group">
            <input
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>

        <p className="login-text">

          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;