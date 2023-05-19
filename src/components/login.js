import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../services/authContext";
//import { alert } from "./alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/login.css';

function Login(){
    //constant for get data form login user
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    //context for login
    const { login } = useAuth();
    //constant for handler error
    const [error, setError] = useState("");
    //hook navigate
    const navigate = useNavigate();
    //Submit data form login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            setError("Error en el inicio de sesión");
        }
    };
    //Handler change form login
    const handleChange = ({ target: { value, name } }) =>
        setUser({ ...user, [name]: value });
    return (
        <div className="" id="login">
            <div className="container" >
                <div className="m-0 vh-100 row justify-content-center align-items-center">
                    <div className="col-5  p-5 text-center">
                        <div className="well well-sm">
                            <h3 className="titulo">Inicia Sesión</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group text_align">
                                    <label className="texto">Correo electrónico:</label>
                                    <input type="email" name="email" id="email"  className="form-control" onChange={handleChange} required/>
                                    <span className="error" >
                                    </span><br></br>
                                </div>
                                <div className="form-group text_align">
                                    <label className="texto">Contraseña:</label>
                                    <input type="password" id="password" name="password"  className="form-control" onChange={handleChange}  required/>
                                    <span className="error" >
                                    </span><br></br>
                                    <span className="error">{error}</span>
                                </div>
                                <div className="form-group ">
                                    <button className="btn-primary button ">Ingresar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Login;