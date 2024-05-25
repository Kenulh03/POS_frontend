import { useState } from "react";
import axios from "axios";
import { useAuth } from "./utils/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errorRequest,setErrorRequest] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password:password
        };

        axios.post("http://localhost:8080/auth/login",data)
            .then(function (response) {
                login(response.data.token);
                localStorage.setItem('role',response.data.role);
                console.log(response.data);
                navigate("/")
            }).catch(function (error) {
                alert("Invalid Username or Password");
            });
    }

    return (
        <div>
        <img src="/images/supermarket.jpg" alt="" className="image-fluid"/>
        <div className="form">
            <h1>Login</h1>
            <br/>
            <br/>
            <form onSubmit={handleLogin}>
                <label>
                    UserName :
                    <input type="text" onChange={(e) => {
                        setUsername(e.target.value);
                    }} name="email" />
                </label>
                <br/>
                <label>
                    Password : 
                    <input type="password" name="password" onChange={(e) =>{
                        setPassword(e.target.value);
                    }} />
                </label>
                <br/>
                <br/>
                <button type="submit">Login</button>
            </form>
            </div>
        </div>
    )
}

export default LoginPage;