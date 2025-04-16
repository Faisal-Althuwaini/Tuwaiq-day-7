import React, { useState } from "react";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Register() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleFrom = (e) => {
    e.preventDefault();
    toast.success("User Registered successfully!");
    navigate("/");
    const userData = {
      email,
      password,
      username,
      gender,
    };
    console.log(userData);
    // send data to backend;
  };

  return (
    <>
      <Header />
      <div className="content">
        <div className="card-container">
          <div className="card mt-5 card-style">
            <h1 className="text-center">Register </h1>
            <form onSubmit={handleFrom}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option defaultValue value="">
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
