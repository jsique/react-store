import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link  } from "react-router-dom";
import { useAuth } from "../services/authContext";

function NavBar(params){
    //Context logout callback
    const { logout } = useAuth();
    //Context for logout button
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error.message);
        }
    };
    //validation counter products shopping cart
    if(params.contProduct>0){
        var btn = <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{params.contProduct}</span>;                    
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar1" >
            <div className="container-fluid">
                <label >La Bodega</label>
            </div>
            <div className="d-flex">
                <Link to={"/"}>
                    <button type="button"   className="icon_nav bi bi-grid-3x3-gap-fill " ></button>
                </Link>
                
                <Link to={`/shopping_cart`}>
                    <button   className="icon_nav bi bi-cart-fill position-relative" >
                            {btn}
                    </button>            
                </Link>
                <button  className="icon_nav bi bi-inbox-fill"></button>
                <button  className="icon_nav bi bi-box-arrow-right" onClick={handleLogout}></button>
            </div>
        </nav>
    )
}

export default NavBar;
