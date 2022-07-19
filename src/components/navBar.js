import React from "react";
//import { useAuth } from "../services/authContext";
//import '../assets/css/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from "../services/authContext";

function NavBar(){

    const { logout, user } = useAuth();

    console.log(user);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar1" >
            <div className="container-fluid">
                <label >La Bodega</label>
            </div>
            <div className="d-flex">
                <button type="button"   className="icon_nav bi bi-grid-3x3-gap-fill " ></button>
                <button   className="icon_nav bi bi-cart-fill" >
                    <div className="show_prod_cart"></div>
                </button>            
                <button  className="icon_nav bi bi-inbox-fill" ></button>
                <button  className="icon_nav bi bi-box-arrow-right" onClick={handleLogout}></button>
            </div>
        </nav>
    )
}

export default NavBar;
