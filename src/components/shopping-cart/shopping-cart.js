import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../navBar';
import { authContext } from "../../services/authContext";
import { useEffect, useContext,useState } from "react";
import "../../assets/css/shopping_car.css";
import {  useNavigate } from "react-router-dom";
import { updateProduct } from "../../services/api.js";
function ShoppingCart(){
    //hook const navigate
    const navigate = useNavigate();
    //function back to homepage
    const BackToHome = () => {
        navigate("/");
    }
    //constant for total amount control
    const [totalAmount, settotalAmount] = useState(0);
	//global shopping cart listing constant hook
    const { gListShop } = useContext(authContext);
    //Rendering of shopping cart
    useEffect(()=>{
        console.log(gListShop);
        let tmpAmount = 0;
        if(gListShop.length > 0){
            gListShop.map((p)=>(
                    tmpAmount += (p.priceProduct*p.quantity)
                )
            )
            settotalAmount(tmpAmount);
        }
    },[gListShop]);
    //function for pay shopping car
    const payCart = async () => {
        //tour cycle
        await gListShop.map((p) => {
                //function call to update the list of products
                var result =  updateProduct(p.idProduct,p.disponible);
                return result;
            }
        );
        navigate("/");
    }; 

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
                            {
                                gListShop && 
                                    gListShop.map((p, index) => (
                                        <div key={index} className="row border_div">
                                            <div className="col-sm-3">
                                                <img src={"/img/" + p.nameImage} alt="" width="100" height="100" />
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>{p.nameProduct}</h4>
                                                <strong>Unidades: </strong> <label >{p.quantity}</label><br/>
                                                <strong>Sub total: </strong> <label >${p.priceProduct*p.quantity}</label>   
                                            </div>
                                        </div>
                                        // <tr key={p.idProduct} className="tbl_content" >
                                        //     <td key={p.nameProduct}> 
                                        //         <img src={"/img/" + p.nameImage} alt="" width="100" height="100" />
                                        //     </td>     
                                        //     <h4 key={p.nameImage}>{p.nameProduclt}</h4>
                                        //     <strong>Unidades: </strong> <label for="">{p.quantity}</label><br/>
                                        //     <strong>Sub total: </strong> <label for="">${p.priceProduct*p.quantity}</label>   
                                        // </tr>
                                        // <p key={p.idProduct}>{p.nameProduct}</p>
                                    )
                                )
                            }
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <h3>Total: $ {totalAmount} </h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <button type="button" className="btn btn-light btn_cart" onClick={BackToHome} >Cancelar</button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-light btn_cart" onClick={payCart} >Pagar</button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShoppingCart;