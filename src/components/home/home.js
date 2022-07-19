import React from "react";
import '../../assets/css/home.css';
import NavBar from '../navBar';
import {getProducts} from "../../services/api.js";
import { useState, useEffect } from "react";

function Home(){
    const [products, setProdcuts] = useState();

    useEffect(() =>{
        getProductsData();
    }, []);

    const getProductsData = async () =>{
        const p = await getProducts();
        console.log(p.docs);
        setProdcuts(p.docs);
    }

    return (
        <div id="home" className="">
            <NavBar/>
            <div className="navbar1 content ">
                <nav className="navbar navbar-expand-lg navbar-light navbar2" >
                    <div className="container-fluid">
                        <h3>Catálogo de productos</h3>
                    </div>
                    <div className="form-inline">
                        <label >¿Qué estás buscando?</label>
                        <input id="filter_Product  " name="filter_Product" className="form-control mr-sm-2 bi-search" type="input" placeholder="Buscar producto" 
                        aria-label="Search" width="200"/>
                    </div>
                </nav>
                <hr></hr>
                <div key={1} className="wrapper">
                    <div key={2} className="gallery">
                    {
                        products && products.map(p=>
                            <div key={p.data().name} className="item">
                                <img src={p.data().image}  width="auto" height="170px" />
                                <h5>{p.data().name}</h5>
                                <label  className="label-names"><strong>Precio: ${p.data().precio}</strong></label><br/>
                                <label  className="label-names"><strong>Unidades disponibles: {p.data().disponible}</strong></label>
                                <div className="container more-options">
                                    <input type="number" min="1" className="number-product" id="quantityP" defaultValue={1}/>
                                </div>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
