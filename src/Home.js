import { Link } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import  "./App.css";


function Home() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div>
      <nav className=" nav navbar navbar-expand-md bg-body-tertiary fixed-top bg-primary ">
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
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
      <div className="content-home">
        <h1>Welcome to POS System!</h1>
      </div>
      
      
    </div>
  );
}

export default Home;
