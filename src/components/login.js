import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../services/authContext";
//import { alert } from "./alert";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/login.css';

//console.log("este es el login")

function Login(){
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    //const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { login } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("handleSubmit"+ user.password);
        setError("");
        //if(emailPattern.text(user.email)){}
        try {
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            //console.log(error.message);
            setError("Error en el inicio de sesión");
        }
    };

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