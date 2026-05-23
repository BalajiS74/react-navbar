import React, { useRef } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import butterflyGif from "../assets/logo.gif";

const API_BASE_URL = "http://localhost:3000";

function getRandomPosition() {
  // Avoid edges: 10vw/10vh to 80vw/80vh
  const left = Math.random() * 70 + 10; // 10vw to 80vw
  const top = Math.random() * 70 + 10; // 10vh to 80vh
  return { left: `${left}vw`, top: `${top}vh` };
}

function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = React.useState({
    email: "",
    password: "",
  });
  const [signUpErrors, setSignUpErrors] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validateLoginData = () => {
    const errors = {};
    if (!loginData.email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(loginData.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!loginData.password) {
      errors.password = "Password is required.";
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const validateSignUpData = () => {
    const errors = {};
    if (!signUpData.username) {
      errors.username = "Username is required.";
    }
    if (!signUpData.email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(signUpData.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!signUpData.password) {
      errors.password = "Password is required.";
    } else if (signUpData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const alertTypes = {
    login: {
      title: "Login Successful",
      icon: "success",
    },
    signUp: {
      title: "Sign Up Successful",
      icon: "success",
    },
  };
  const errorTypes = {
    login: {
      title: "Login Failed",
      text: "Please check your credentials and try again.",
      icon: "error",
      confirmButtonText: "OK",
    },
    signUp: {
      title: "Sign Up Failed",
      text: "Please check your details and try again.",
      icon: "error",
      confirmButtonText: "OK",
    },
  };
  const showAlert = (type) => {
    const { title, icon } = alertTypes[type] || {};
    return Swal.fire({
      title: title || "Success",
      icon: icon || "success",
      draggable: true,
    });
  };
  const loginAlert = () => {
    return showAlert("login");
  };

  const signAlert = () => {
    return showAlert("signUp");
  };
  // Error alerts
  // to make it more readable and maintainable
  const showErrorAlert = (type, customText) => {
    const { title, text, icon, confirmButtonText } = errorTypes[type] || {};
    return Swal.fire({
      title: title || "Error",
      text: customText || text || "An error occurred. Please try again.",
      icon: icon || "error",
      confirmButtonText: confirmButtonText || "OK",
      draggable: true,
    });
  };
  const loginErrorAlert = (customText) => {
    return showErrorAlert("login", customText);
  };

  const signUpErrorAlert = (customText) => {
    return showErrorAlert("signUp", customText);
  };

  React.useEffect(() => {
    document.title = isLogin ? "Login" : "Sign Up";
  }, [isLogin]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginData()) {
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        loginData,
      );
      if (response.status === 200) {
        setLoginErrors({ email: "", password: "" });
        loginAlert();
      }
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || "Unable to login.";
      loginErrorAlert(message);
    }
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignUpData()) {
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        signUpData,
      );
      if (response.status === 201) {
        setSignUpErrors({ username: "", email: "", password: "" });
        signAlert();
      }
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error.message ||
        "Unable to register user.";
      signUpErrorAlert(message);
    }
  };

  // Butterfly animation state
  const [butterflyPos, setButterflyPos] = React.useState(getRandomPosition());
  const [isFlying, setIsFlying] = React.useState(false);

  React.useEffect(() => {
    let timeout;
    if (!isFlying) {
      // Wait a bit before flying to next position
      timeout = setTimeout(() => {
        setButterflyPos(getRandomPosition());
        setIsFlying(true);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [isFlying]);

  // When animation ends, allow next move
  const handleAnimationEnd = () => {
    setIsFlying(false);
  };

  return (
    <>
      {/* Butterfly GIF Animation flying to random places */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          flexDirection: "column",
          color: "white",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <img
            src={butterflyGif}
            alt="Flying Butterfly"
            style={{
              position: "absolute",
              width: "70px",
              height: "auto",
              left: butterflyPos.left,
              top: butterflyPos.top,
              transition: isFlying
                ? "left 2.5s cubic-bezier(.4,2,.6,.8), top 2.5s cubic-bezier(.4,2,.6,.8)"
                : "none",
              willChange: "left, top",
            }}
            onTransitionEnd={handleAnimationEnd}
          />
          <img
            src={butterflyGif}
            alt="Flying Butterfly"
            style={{
              position: "absolute",
              width: "70px",
              height: "auto",
              left: butterflyPos.left,
              top: butterflyPos.top,
              transition: isFlying
                ? "left 2.5s cubic-bezier(.4,2,.6,.8), top 2.5s cubic-bezier(.4,2,.6,.8)"
                : "none",
              willChange: "left, top",
            }}
            onTransitionEnd={handleAnimationEnd}
          />
          <img
            src={butterflyGif}
            alt="Flying Butterfly"
            style={{
              position: "absolute",
              width: "70px",
              height: "auto",
              left: butterflyPos.left,
              top: butterflyPos.top,
              transition: isFlying
                ? "left 2.5s cubic-bezier(.4,2,.6,.8), top 2.5s cubic-bezier(.4,2,.6,.8)"
                : "none",
              willChange: "left, top",
            }}
            onTransitionEnd={handleAnimationEnd}
          />
        </div>
        {isLogin ? (
          <div
            className="login-container"
            style={{
              width: "400px",

              borderRadius: "8px",
              height: "auto",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h2>Sign In</h2>
            <form
              style={{
                width: "75%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
              onSubmit={handleLoginSubmit}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "10px",
                  gap: "10px",
                }}
              >
                <label style={{ fontSize: "18px" }}>Email</label>
                <div style={{ position: "relative", width: "100%" }}>
                  <FaEnvelope
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#ccc",
                    }}
                  />
                  <input
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    style={{
                      padding: "10px 10px 10px 35px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "transparent",
                      color: "white",
                      fontSize: "15px",
                    }}
                  />
                  {loginErrors.email && (
                    <span style={{ color: "#ff6b6b", fontSize: "13px" }}>
                      {loginErrors.email}
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "10px",
                  gap: "10px",
                }}
              >
                <label style={{ fontSize: "18px" }}>Password</label>
                <div style={{ position: "relative", width: "100%" }}>
                  <FaLock
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#ccc",
                    }}
                  />
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    style={{
                      padding: "10px 10px 10px 35px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "transparent",
                      color: "white",
                      fontSize: "15px",
                    }}
                  />
                  {loginErrors.password && (
                    <span style={{ color: "#ff6b6b", fontSize: "13px" }}>
                      {loginErrors.password}
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    style={{ marginRight: "5px" }}
                  />
                  <label
                    htmlFor="rememberMe"
                    style={{ fontSize: "14px", color: "white" }}
                  >
                    Remember Me
                  </label>
                </div>
                <div>
                  <a
                    href="#"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#005163",
                  color: "white",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "16px",
                  marginTop: "10px",
                  textAlign: "center",
                }}
                // onClick={loginAlert}
              >
                Login
              </button>
              <div
                className="signup-prompt"
                style={{ marginTop: "10px", color: "white" }}
              >
                <span>Don't have an account?</span>
                <button
                  style={{
                    color: "white",
                    textDecoration: "none",
                    background: "transparent",
                    border: "none",
                    marginLeft: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div
            className="login-container"
            style={{
              width: "400px",
              padding: "20px 20px 40px 20px",
              borderRadius: "8px",
              height: "auto",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h2>Sign Up</h2>
            <form
              style={{
                width: "75%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
              onSubmit={handleSignUpSubmit}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "10px",
                  gap: "10px",
                }}
              >
                <label style={{ fontSize: "18px" }}>Username</label>
                <div style={{ position: "relative", width: "100%" }}>
                  <FaUser
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#ccc",
                    }}
                  />
                  <input
                    type="text"
                    required
                    value={signUpData.username}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, username: e.target.value })
                    }
                    style={{
                      padding: "10px 10px 10px 35px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "transparent",
                      color: "white",
                      fontSize: "15px",
                    }}
                  />
                  {signUpErrors.username && (
                    <span style={{ color: "#ff6b6b", fontSize: "13px" }}>
                      {signUpErrors.username}
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "10px",
                  gap: "10px",
                }}
              >
                <label style={{ fontSize: "18px" }}>Email</label>
                <div style={{ position: "relative", width: "100%" }}>
                  <FaEnvelope
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#ccc",
                    }}
                  />
                  <input
                    type="email"
                    required
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    style={{
                      padding: "10px 10px 10px 35px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "transparent",
                      color: "white",
                      fontSize: "15px",
                    }}
                  />
                  {signUpErrors.email && (
                    <span style={{ color: "#ff6b6b", fontSize: "13px" }}>
                      {signUpErrors.email}
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "10px",
                  gap: "10px",
                }}
              >
                <label style={{ fontSize: "18px" }}>Password</label>
                <div style={{ position: "relative", width: "100%" }}>
                  <FaLock
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#ccc",
                    }}
                  />
                  <input
                    type="password"
                    required
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    style={{
                      padding: "10px 10px 10px 35px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "transparent",
                      color: "white",
                      fontSize: "15px",
                    }}
                  />
                  {signUpErrors.password && (
                    <span style={{ color: "#ff6b6b", fontSize: "13px" }}>
                      {signUpErrors.password}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#005163",
                  color: "white",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "16px",
                  textAlign: "center",
                }}
                // onClick={signAlert}
              >
                Sign up
              </button>
              <div
                className="signup-prompt"
                style={{ marginTop: "10px", color: "white" }}
              >
                <span>already have an account?</span>
                <button
                  style={{
                    color: "white",
                    textDecoration: "none",
                    background: "transparent",
                    border: "none",
                    marginLeft: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsLogin(true)}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
