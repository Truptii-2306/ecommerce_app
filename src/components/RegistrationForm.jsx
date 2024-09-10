import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  function validateData() {
    let error = {};
    let emailExists = users.some((user) => user.email === email);
    if (!email) {
      error.email = "Email is required";
    } else {
      if (!email.includes("@") || email.split("@")[1].split(".").length < 2) {
        error.email = "Invalid email address";
      }
      if (emailExists) {
        error.email = "Email already exists";
      }
    }
    if (!password) {
      error.password = "Password is required";
    } else {
      if (password.length < 6) {
        error.password = "Password must be at least 6 characters";
      }
    }
    if (!fullName) {
      error.fullName = "Full Name is required";
    }
    if (!companyName) {
      error.companyName = "Company Name is required";
    }
    if (Object.keys(error).length > 0) {
      setError(error);
      return false;
    }
    return true;
  }

  function generateUniqId(id = users.length + 1) {
    if (users.some((user) => user.id === id)) {
      return generateUniqId(id + 1);
    } else {
      return id;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateData()) {
      users.push({
        id: generateUniqId(),
        email,
        password,
        companyName,
        fullName,
        roll: "seller",
        isEmailVerified: false,
      });
      localStorage.setItem("users", JSON.stringify(users));
      setEmail("");
      setPassword("");
      setFullName("");
      setCompanyName("");
      navigate("/auth/login");
    }
  }

  function onLoginToAccount(event) {
    event.preventDefault();
    navigate("/auth/login");
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="d-flex flex-column col-sm-6 col-lg-3 p-4 border border-1 rounded"
        onSubmit={(event) => handleSubmit(event)}
      >
        <h3 className="text-start mb-3">Register User</h3>

        <div className="d-flex flex-column form-group mb-2">
          <label className="col-form-label text-start" htmlFor="email">
            Email Address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="abc@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span
            className="d-flex text-danger small h-2 mt-0.5"
            style={{ height: "10px" }}
          >
            {error.email}
          </span>
        </div>

        <div className="d-flex flex-column form-group mb-2">
          <label className="col-form-label text-start" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span
            className="d-flex text-danger small h-2 mt-0.5"
            style={{ height: "10px" }}
          >
            {error.password}
          </span>
        </div>

        <div className="d-flex flex-column form-group mb-2">
          <label className="col-form-label text-start" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            params
            placeholder="Enter your full name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <span
            className="d-flex text-danger small h-2 mt-0.5"
            style={{ height: "10px" }}
          >
            {error.fullName}
          </span>
        </div>

        <div className="d-flex flex-column form-group mb-3">
          <label className="col-form-label text-start" htmlFor="companyName">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            placeholder="Enter your company name"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
          <span
            className="d-flex text-danger small h-2 mt-0.5"
            style={{ height: "10px" }}
          >
            {error.companyName}
          </span>
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-success ">
            Sign up
          </button>
          <div className="text-center">
            <p className="mb-0">Already have an account? </p>
            <a href="#" onClick={(event) => onLoginToAccount(event)}>
              login to account
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
