import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
// import { LoginStart, LoginSuccess } from "../../context/Actions";
import { Context } from "../../context/Context"
import axios from 'axios'
import "./login.css";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user,dispatch, isFetching} = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", { 
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      // console.log(res.data)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (e) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  console.log(user)
  return (
    <div className="login">
      <span className="loginTitle">Log in</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}

        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Log in
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
