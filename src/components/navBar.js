import React from "react";
//import { useAuth } from "../services/authContext";
//import '../assets/css/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link  } from "react-router-dom";
//import { useLocation } from "react-router-dom";
import { useAuth } from "../services/authContext";



function NavBar(params){
    const { logout } = useAuth();
    //let history = useLocation();
    //console.log("contador:"+params.contProduct);
    
    //const authProvider = useContext(useAuth);
    //console.log("listShopCar:"+gListShop);
    //console.log('user 1:',user);
    const handleLogout = async () => {
        try {
            //console.log('logout');
            await logout();
            //location.reload();
        } catch (error) {
            console.error(error.message);
        }
    };

    if(params.contProduct>0){
        var btn = <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{params.contProduct}</span>;                    
    }
    
    //history.push('/shopping_cart?list=someArray', { someArray: [...params.listShopCar] });
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
