import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./App.css";
import Users from "./Users";
import List from "./List";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import Orders from "./Orders";
import EditOrder from "./EditOrder";
import { AuthProvider } from "./utils/AuthContext";
import LoginPage from "./login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useState } from "react";
import Categories from "./Categories";
import Print from "./Print";

function App() {


  return (
    <div className="App">
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        
        {/*Authenticated Routes*/}
        <Route element={<ProtectedRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="orders/:id/print" element={<Print />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id/editOrder" element={<EditOrder />} />
          <Route path="/" element={<Home />} />
        </Route>
        
        {/*Unauthenticated Routes*/}
        <Route path="/login" element={<LoginPage />} />
        

      </Routes>
    </BrowserRouter>
    </AuthProvider>
    

    </div>
  );
}

function ListItem({ itemName, itemId }) {
  return (
    <div>
      {itemName}
      <ChildComponent />
    </div>
  );
}

function ChildComponent() {
  return <div>ChildComponent</div>;
}

export default App;
