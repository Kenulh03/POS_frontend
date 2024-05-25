import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import api from "./utils/api"

function Print(){
    const { id } = useParams();
    const { isAuthenticated,jwtToken } = useAuth();
  
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);


  const config = {
    headers : {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
    axios
      .get(`http://localhost:8080/orders/${id}`,config)
      .then(function (response) {
        setOrder(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      axios
      .get("http://localhost:8080/products",config)
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}, [isAuthenticated]);



return(
    <div>
     {order && (
        <div>
        <div className="container">
        <div id="printableArea">
        <table className="table table-striped table-hover">
        <div className="order-details">
            <div className="d-flex align-items-center justify-content-between">
              <th><div className="datetime">Date and Time: {order.orderDate}</div></th>
            </div>
          </div>
          <tbody>
                  {order.orderedProducts.map((product) => (
                    <tr>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      </tr>
                      ))}
            </tbody>
            <th><div className="total-price">
                <h3>Total Price: Rs. {order.totalPrice}</h3>
              </div>
              </th></table>
              </div>
            <button type="button" className=" button-print btn btn-primary btn-lg" onClick={window.print}>Print</button>
        </div>
    </div>
     )}
     </div>
);
}

export default Print;