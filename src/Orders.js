import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import api from './utils/api';
import { Link } from "react-router-dom";

function Orders() {

    const { isAuthenticated,jwtToken,logout } = useAuth();
    const [orders,setOrders] = useState(null);
    const navigate = useNavigate(); //to navigate users programatically

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }
    

    useEffect(() => {
        if(isAuthenticated) {
        api.get("/orders")
        .then(function (response) {
            setOrders(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    },[isAuthenticated])

    function createOrder(event) {
        event.preventDefault();

        api
        .post(`/orders`)
        .then(function (response) {
            navigate(`/orders/${response.data.id}/editOrder`);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

   

  return (
    <div>
    <nav className="nav navbar navbar-expand-md bg-body-tertiary fixed-top bg-primary">
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
              </li>
              <li className="nav-item">
                  <Link to="/categories" className="nav-link">
                    Categories
                  </Link>
                </li>
              <li className="nav-link-active">
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
      <br/>
      <br/>
      <img src="/images/supermarket.jpg" alt=""/>
      <h1 className="order-heading">Orders</h1>


      <div className="order-button">
        <button type="button" onClick={createOrder} className="btn btn-primary">Create Order</button>
      </div>
      <div className="orders-table">
      <table className="table table-striped table-dark">
        <thead>
            <tr>
                <th>#ID</th>
                <th>Date and Time</th>
                <th>Total Items</th>
                <th>Total Price</th>
                <th colSpan={2}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {orders && orders.map((order) => (
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderedProducts.length}</td>
                    <td>{order.totalPrice}</td>
                    <td>{ (order.completed) == 0 ? <button className="btn btn-primary btn-sm" onClick = {() =>{
                        navigate(`/orders/${order.id}/editOrder`)
                    }}>Edit</button>:null}</td>
                    <td>{ (order.completed) == 1 ?<button className="btn btn-primary btn-sm" onClick = {() =>{
                        navigate(`/orders/${order.id}/print`)
                    }}>Print</button>:null}</td>
                </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Orders;
