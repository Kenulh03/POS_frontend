import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./utils/AuthContext";
import api from './utils/api';
import { Link } from "react-router-dom";


function Categories() {
    const { isAuthenticated, jwtToken,logout } = useAuth();
    const[categories, setCategories] = useState(null);

    const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }
  
      useEffect(() => {
        
        if (isAuthenticated) {
          axios.get("http://localhost:8080/categories",config)
          .then(function (response){
              setCategories(response.data);
          })
          .catch(function (error) {
              console.log(error);
          });
  
        }
      },[isAuthenticated])
  
  
      const[name, setName] = useState("");
      const[price, setPrice] = useState("");
      const[qty, setQty] = useState("");
      const[categoryId,setCategoryId] = useState(null);
    
     
    
      function getCategories() {
        axios
          .get("http://localhost:8080/categories",config)
          .then(function (response) {
            setCategories(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
      
      
    
      function handleName(event) {
        setName(event.target.value);
      }
    
      
    
      
  
      function handleCategory(event){
          setCategoryId(event.target.value);
      }
    
      function createCategory(event) {
        event.preventDefault();
    
        const data = {
          name: name
        };
    
        axios
          .post("http://localhost:8080/categories", data,config)
          .then(function (response) {
            getCategories();
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
  
      const[edit,setEdit] = useState(false);
  
      function updateCategory(event) {
        event.preventDefault();
  
        const data = {
          name: name,
        }
        api
        .put("/categories/"+categoryId, data)
        .then(function (response) {
          getCategories();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
     
      
      return(
          <div>
          <nav className="navbar bg-dark navbar-expand-md bg-body-tertiary fixed-top bg-primary">
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
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                </li> <li className="nav-link-active">
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
        <img src="/images/supermarket.jpg" alt="" className="image-fluid"/>           
          <br/>
          <br/>
           
          <div className="products-table">
          <table className="table table-sm table-dark table-hover table-striped">
          <thead className="thead thead-dark">
              <tr>
                  <th>Category ID</th>
                  <th>Name</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
        {categories &&
        categories.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td><button type="button" className="btn btn-primary" onClick={() => {
              setEdit(true);
              setCategoryId(row.id)
              setName(row.name);
              }}>Edit</button></td>
          </tr>
        ))}
        </tbody>
        </table>
        </div>
  
     
          {!edit &&
            <div className="products">
            <h2>Create Category</h2>
  
            <form onSubmit={createCategory}>
              <div>
                <label>Name</label>
                <input type="text" onChange={handleName} required />
              </div>
  
             <br/><br/>
              <button type="submit">Create Category</button>
            </form>
          </div>}
  
          {edit &&
            <div className="products">
              <h2>Update Category</h2>
              <form onSubmit={updateCategory}>
              <div>
                <label>Name</label>
                <input type="text" onChange={handleName} value={name}required />
              </div>
  
              <br/><br/>
              <button type="submit">Update Category</button>
            </form>
            </div>}
          </div>
      )

}

export default Categories;