import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { toast } from "react-toastify";

function User() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    const usersData = response.data;
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  function handleRemoveUser(userId) {
    const removeUser = async () => {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted Successfully");
    };
    removeUser();
  }

  function handleAddUser(e) {
    e.preventDefault();
    const addUser = async () => {
      await axios.post("http://localhost:3000/users", userData);
      setUsers([...users, userData]);
      toast.success("User added successfully");
    };
    addUser();
  }

  function handleEditUser(user, name) {
    console.log(user);
    console.log(name);
    const editUser = async () => {
      await axios.put(`http://localhost:3000/users/${user.id}`, {
        ...user,
        name: name,
      });
      setUsers([...users, userData]);
      toast.success("User updated successfully");
    };
    editUser();
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        {users.map((user) => (
          <div className="card mb-3" key={user.id}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">Email: {user.email}</p>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  Remove user
                </button>
                <button
                  className="btn btn-primary mx-4"
                  onClick={() => handleEditUser(user, "Faisal Update")}
                >
                  Edit user
                </button>
              </div>
            </div>
          </div>
        ))}

        <div>
          <form onSubmit={handleAddUser}>
            <h1>Add User</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Username
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
                email
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

export default User;
