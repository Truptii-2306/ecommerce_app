import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const users = JSON.parse(localStorage.getItem("users")) || [];

  function validateData() {
    let error = {};
    const userExists = users.some(
      (user) => user.email === email && user.password === password
    );

    if (!email) {
      error.email = "Email is required";
    }
    if (!password) {
      error.password = "Password is required";
    }
    if (email && password && !userExists) {
      error.invalid = "Incorrect email or password";
    }
    if (Object.keys(error).length > 0) {
      setError(error);
      return false;
    } else {
      return true;
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    const user = users.find((user) => user.email === email);
    if (validateData()) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...user, expTime: new Date().getTime() })
      );
      setEmail("");
      setPassword("");
      navigate("/my-profile");
    }
  }

  function onCreateAccount(event) {
    event.preventDefault();
    navigate("/auth/register");
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      {error.invalid && (
        <span
          className="alert alert-danger alert-dismissible fade show col-sm-6 col-lg-3"
          role="alert"
        >
          {error.invalid}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </span>
      )}
      <form
        className="d-flex flex-column col-sm-6 col-lg-3 p-4 border border-1 rounded"
        onSubmit={(event) => handleLogin(event)}
      >
        <h3 className="text-start mb-3">Log in</h3>

        <div className="d-flex flex-column form-group mb-1">
          <label className="col-form-label text-start" htmlFor="email">
            Email Address
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span
            className="d-flex text-danger small h-2 mt-0.5"
            style={{ height: "10px" }}
          >
            {error.email}
          </span>
        </div>

        <div className="d-flex flex-column form-group mb-4">
          <label className="col-form-label text-start" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="d-flex text-danger small h-2 mt-0.5"
            style={{ height: "10px" }}
          >
            {error.password}
          </span>
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-success ">
            Login
          </button>
          <div className="text-center">
            <p className="mb-0">Don't have an account? </p>
            <a href="#" onClick={(event) => onCreateAccount(event)}>
              create an account
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
