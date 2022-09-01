import React from "react";
import '../../assets/css/detail_product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../navBar';
import {getProduct} from "../../services/api.js";
import { useState , useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
function DetailProduct(){

    const navigate = useNavigate();
    const BackToHome = () => {
        navigate("/");
    }

    
    //console.log('productId:',productId);

    const [product, setProdcut] = useState("");
    
    //const navigate = useNavigate();
    let { productId } = useParams();
    
    useEffect(() =>{
        getProductData(productId);
    }, [productId]);
        


    const getProductData = async (productId) =>{
        const p = await getProduct(productId);
        //console.log("Result getProduct",p);
        setProdcut(p.data());
    }
    

    console.log(product);
    /*const { match: { params } } = this.props;
    console.log(params.detail_product)*/
    return(
        <div>
            <NavBar/>
            <div className="firt_content">
                
                <nav className="navbar navbar-expand-lg navbar-light navbar2" >
                    <h2 className="title">{product.name}</h2>
                </nav>
                <hr></hr>
                <div className="second_content">
                    <div className="row">
                        <div className="col-6 image_frame">
                            <img className="image_product" src={"/img/"+product.img_name} alt={product.name_image}  width="auto" height="400" />
                        </div>
                        <div className="col-6">
                                <strong id="price">Precio:</strong> <label  id="price"> {product.precio}</label>
                                <br/>
                                <strong>Unidades disponibles:</strong><label >{product.disponible}</label>
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-1">
                            <button  className="btn" onClick={BackToHome}>Atrás</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailProduct;