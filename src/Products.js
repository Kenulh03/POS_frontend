import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./utils/AuthContext";
import api from './utils/api';
import { Link } from "react-router-dom";

function Products() {

    const { isAuthenticated, jwtToken,logout } = useAuth();

    const[products, setProducts] = useState(null);
    const[categories, setCategories] = useState(null);


    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }

    useEffect(() => {
      
      if (isAuthenticated) {
        axios.get("http://localhost:8080/products",config)
        .then(function (response){
            setProducts(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

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
  
   
  
    function getProducts() {
      axios
        .get("http://localhost:8080/products",config)
        .then(function (response) {
          setProducts(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    
    
  
    function handleName(event) {
      setName(event.target.value);
    }
  
    function handlePrice(event) {
      setPrice(parseFloat(event.target.value));
    }
  
    function handleQuantity(event) {
      setQty(parseInt(event.target.value));
    }

    function handleCategory(event){
        setCategoryId(event.target.value);
    }
  
    function createProduct(event) {
      event.preventDefault();
  
      const data = {
        name: name,
        price: price,
        qty: qty,
        categoryId :categoryId
      };
  
      axios
        .post("http://localhost:8080/products", data,config)
        .then(function (response) {
          getProducts();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const[edit,setEdit] = useState(false);
    const[productId,setProductId] = useState(null);

    function updateProduct(event) {
      event.preventDefault();

      const data = {
        name: name,
        price: price,
        qty: qty,
        categoryId : categoryId
      }
      axios
      .put("http://localhost:8080/products/"+productId, data,config)
      .then(function (response) {
        getProducts();
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
              <li className="nav-link-active">
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
      <img src="/images/supermarket.jpg" alt="" className="image-fluid"/>           
        <br/>
        <br/>
         
        <div className="products-table">
        <table className="table table-sm table-dark table-hover table-striped">
        <thead className="thead thead-dark">
            <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
      {products &&
      products.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.name}</td>
          <td>{row.price}</td>
          <td>{row.qty}</td>
          <td>{row.category?.name}</td>
          <td><button type="button" className="btn btn-primary" onClick={() => {
            setEdit(true);
            setProductId(row.id)
            setName(row.name);
            setPrice(row.price);
            setQty(row.qty);
            setCategoryId(row.category?.id);
            }}>Edit</button></td>
        </tr>
      ))}
      </tbody>
      </table>
      </div>

   
        {!edit &&
          <div className="products">
          <h2>Create Product</h2>

          <form onSubmit={createProduct}>
            <div>
              <label>Name</label>
              <input type="text" onChange={handleName} required />
            </div>

            <br />

            <div>
              <label>Price</label>
              <input type="text" onChange={handlePrice} required />
            </div>

            <br />

            <div>
              <label>Quantity</label>
              <input type="text" onChange={handleQuantity} required />
            </div>

            <br />
            <br />

            <div>
                <label>Category</label>
                <select onChange={handleCategory} required>
                    <option value="">Select a category</option>

                    {categories && categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <br/><br/>
            <button type="submit">Create Product</button>
          </form>
        </div>}

        {edit &&
          <div className="products">
            <h2>Update Product</h2>
            <form onSubmit={updateProduct}>
            <div>
              <label>Name</label>
              <input type="text" onChange={handleName} value={name}required />
            </div>

            <br />

            <div>
              <label>Price</label>
              <input type="text" onChange={handlePrice} value={price}required />
            </div>

            <br />

            <div>
              <label>Quantity</label>
              <input type="text" onChange={handleQuantity} value={qty}required />
            </div>

            <br />
            <br />

            <div>
                <label>Category</label>
                <select onChange={handleCategory} required>
                    <option value="">Select a category</option>

                    {categories && categories.map((category) => (
                        <option key={category.id} value={category.id} selected={categoryId=== category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <br/><br/>
            <button type="submit">Update Product</button>
          </form>
          </div>}
        </div>
    )
}

export default Products;