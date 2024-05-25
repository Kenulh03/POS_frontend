import logo from "./logo.svg";
import { Link } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./utils/AuthContext";

function Users() {
  const { isAuthenticated, jwtToken,logout } = useAuth();

  const [users, setUsers] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const[role, setRole] = useState(""); 

  const [edit, setEdit] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8080/users", config)
        .then(function (response) {
          setUsers(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  function getUsers() {
    axios
      .get("http://localhost:8080/users", config)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleRole(event) {
    setRole(event.target.value);
  }

  function createUser(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      role: role,
    };

    axios
      .post("http://localhost:8080/users", data, config)
      .then(function (response) {
        getUsers();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateUser(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      role: role,
    };

    axios
      .put("http://localhost:8080/users/" + edit, data, config)
      .then(function (response) {
        getUsers();
        setEdit(null);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
    <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top bg-primary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-link-active">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                  <Link to="/categories" className="nav-link">
                    Categories
                  </Link>
                </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              </li>
              <span></span>
              <li className="nav-item">
                {isAuthenticated && (
                  <button className="btn btn-primary" onClick={logout}>
                    Log out
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {" "}
     
      <br />
      <br />
      <img src="/images/supermarket.jpg" alt="" className="image-fluid"/>
      <div className="users-table">
      <table className="table table-striped table-dark">
        <thead className="thead-dark">
            <tr>
                <th scope="col">User ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
      <tbody>
      {users &&
        users.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
            <td>{ (localStorage.getItem('role')) == 'admin' ? <button
              type="button" className="btn btn-primary btn-sm"
              onClick={() => {
                setEdit(row.id);
                setUsername(row.username);
                setEmail(row.email);
                setRole(row.role);
              }}
            >
              Edit
            </button>:null }</td>
            <td>{ (localStorage.getItem('role')) == 'admin' ? <button
              type="button" className="btn btn-primary btn-sm"
              onClick={() => {
                axios
                  .delete("http://localhost:8080/users/" + row.id,config)
                  .then(function () {
                    getUsers();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}
            >
              Delete
            </button>:null}</td>
          </tr>
        ))}
        </tbody>
        </table>
        </div>
      <br />
      <br />

      { (localStorage.getItem('role')) == 'admin' ? 
              <div>
              {!edit && (
        <div className="users">
          <h2>Create User</h2>

          <form onSubmit={createUser}>
            <div>
              <label>Username</label>
              <input type="text" onChange={handleUsername} required />
            </div>

            <br />

            <div>
              <label>Password</label>
              <input type="text" onChange={handlePassword} required />
            </div>

            <br />

            <div>
              <label>Email</label>
              <input type="email" onChange={handleEmail} required />
            </div>

            <br />

            <div>
              <label>Role</label>
              <select onChange={handleRole} required>
                <option value="">Select a categroy</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <br />
            <br />
            <button type="submit">Create User</button>
          </form>
        </div>
      )}
              </div>
      
      :null}

      
      
     
      <br />
      <br />
      {edit && (
        <div className="users">
          <h2>Edit User</h2>

          <form onSubmit={updateUser}>
            <div>
              <label>Username</label>
              <input
                type="text"
                onChange={handleUsername}
                value={username}
                required
              />
            </div>

            <br />

            <div>
              <label>Password</label>
              <input type="text" onChange={handlePassword}/>
            </div>

            <br />

            <div>
              <label>Email</label>
              <input
                type="email"
                onChange={handleEmail}
                value={email}
                required
              />
            </div>

            <br />

            <div>
              <label>Role</label>
              <select onChange={handleRole} required>
                <option value="">Select a categroy</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <br />
            <br />
            <button type="submit">Update User</button>
            <button
              onClick={() => {
                setEdit(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <br />
      <br />
    </div>
  );
}

export default Users;
