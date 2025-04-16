import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

function UpdateUser() {
  //   Extract id from url params
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  //   Fetch user data based on id from params
  //   And store it in userData state
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      const userDataResponse = response.data;
      setUserData(userDataResponse);
    };
    fetchUsers();
  }, [id]);

  //   Handle update user functionality
  async function handleUpdateUserSubmit(e) {
    e.preventDefault();
    await axios.put(`http://localhost:3000/users/${id}`, userData);
    toast.success("User updated successfully");
    navigate("/user");
  }

  return (
    <div>
      <div>
        <div className="container mt-5 mx-24">
          <form onSubmit={handleUpdateUserSubmit}>
            <h1>Update User</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={userData.name}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword"
                value={userData.email}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  });
                }}
              />
              <button type="submit" className="btn btn-primary my-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
