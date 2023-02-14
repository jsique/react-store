import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../navBar';
import { authContext } from "../../services/authContext";
import { useEffect, useContext } from "react";
function ShoppingCart(){

    
	//const { gListShop } = useAuth();
    const { gListShop } = useContext(authContext);
    useEffect(()=>{
        console.log(gListShop);
    },[gListShop]);

    return(
        <div>
            <NavBar/>
            <div className="firt_content">
                <nav className="navbar navbar-expand-lg navbar-light navbar2" >
                    <div className="row">
                        <label  className="title">Carrito de compras</label>
                    </div>
                </nav>
                <hr/><br/>
                <div className="row second_content">
                    <div className="col-6">
                        <table className="tbl_content" border="1">
                            <tbody>
                                <tr className="tbl_content" >
                                    <td > 
                                        <img src="" alt="" width="100" height="100" />
                                    </td>        
                                </tr>
                            </tbody> 
                        </table>    
                    </div>

                    <div className="col-6">
                        <h3>Total: $ </h3>
                        <button type="button" className="btn btn-light btn_cart"  >Cancelar</button>
                        <button type="button" className="btn btn-light btn_cart" >Pagar</button>
                    </div>
                </div>
                {gListShop && gListShop.map((p) => (
                        <p key={p.idProduct}>{p.nameProduct}</p>
                    ))}
            </div>
        </div>
    )
}
export default ShoppingCart;