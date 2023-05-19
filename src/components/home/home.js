import React from "react";
import "../../assets/css/home.css";
import NavBar from "../navBar";
import { getProducts } from "../../services/api.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/authContext";
//import {  useNavigate } from "react-router-dom";

function Home() {
	//constant for array of products
	const [products, setProdcuts] = useState([]);
	//array constant to filter products
	const [filteredList, setFilteredList] = useState([]);
	//array constant add products to shopping cart
	const [shopCar, setShopCar] = useState([]);
	//constant to keep track of the amount of products added
	var [quantity, setQuantity] = useState(1);
	//constant product counter
	let [contProduct, setContProduct] = useState(0);
	//hook to bring the list to the shopping cart view
	const { setgListShop } = useAuth();
	//función para obtener la lista de productos
	const getProductsData = async () => {
		const p = await getProducts();
		const data = p.docs.map((doc) => {
			return {
				id: doc.id,
				quantity: 1,
				disponible:0,
				...doc.data(),
			};
		});
		setProdcuts(data);
		setFilteredList(data);
	};
	//rendering
	useEffect(() => {
		getProductsData();
	}, []);
	//rendering update
	useEffect(() => {
		//console.log("shopCAr update", shopCar);
		setContProduct(shopCar.length);
		setgListShop(shopCar);
	}, [shopCar, filteredList,contProduct,setgListShop]);

	//función para hacer filtro de búsqueda
	const filterBySearch = (event) => {
		// Access input value
		const query = event.target.value;
		// Create copy of item list
		var updatedList = [...products];
		// Include all elements which includes the search query
		updatedList = updatedList.filter((item) => {
			return item.data().name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
		});
		// Trigger render with updated values
		setFilteredList(updatedList);
	};

	//función de control para carrito de compras
	let payProducts = (prmProduct, value) => {
		var prodTemp={};
		var exist = shopCar.filter((x)=>x.idProduct === prmProduct.id);
		var tmpD = 0;
		if (exist.length) {
			//quantity available is changed
			filteredList.map(function(e){
				if(e.id===prmProduct.id){
					e.disponible-=prmProduct.quantity;
					tmpD=e.disponible;
				}
				return tmpD;
			});
			//shopping cart data is added
			shopCar.map(function(element){
				if(element.idProduct===prmProduct.id){
					element.quantity+=prmProduct.quantity;
					element.disponible=tmpD;
				}
				return true;
			});

			setShopCar([...shopCar]);
			setFilteredList(filteredList);
		}
		else{
			filteredList.map(function(e){
				if(e.id===prmProduct.id){
					//console.log("product existe ELSE MAPLIST");
					e.disponible-=prmProduct.quantity;
					tmpD=e.disponible;
				}
				return tmpD;
			});
			//console.log("no existe");
			prodTemp = {
				idProduct: prmProduct.id,
				nameProduct: prmProduct.name,
				priceProduct: prmProduct.precio,
				quantity: prmProduct.quantity,
				nameImage: prmProduct.img_name,
				disponible : tmpD,
			}; //
			setShopCar([...shopCar, prodTemp]);
			setFilteredList(filteredList);
		}
	};
	//plus one unit
	const handlePlus = (e) => {
		setQuantity(e.quantity);
		const newItems = products.filter((product) => product.id !== e.id);
		setProdcuts([...newItems, { quantity: (e.quantity++), ...e }]);
	}
	//least one unit
	const handleMinor = (e) => {
		quantity = e.quantity;
		setQuantity(e.quantity);
		const newItems = products.filter((product) => product.id !== e.id);
		if(quantity<=1){
			e.quantity = 2;
		}
		setProdcuts([...newItems, { quantity: (e.quantity--), ...e }]);
	}

	return (
		<div id="home" className="">
			<NavBar contProduct={contProduct} />
			<div className="navbar1 content ">
				<nav className="navbar navbar-expand-lg navbar-light navbar2">
					<div className="container-fluid">
						<h3>Catálogo de productos</h3>
					</div>
					<div className="form-inline">
						<label>¿Qué estás buscando?</label>
						<input
							id="filter_Product  "
							name="filter_Product"
							className="form-control mr-sm-2 bi-search"
							type="input"
							placeholder="Buscar producto"
							aria-label="Search"
							width="200"
							onChange={filterBySearch}
						/>
					</div>
				</nav>
				<hr></hr>
				<div key={1} className="wrapper">
					<div key={2} className="gallery">
						{filteredList &&
							filteredList.map((p) => (
								<div key={p.name} className="item">
									<img
										src={"/img/" + p.img_name}
										alt={p.name}
										width="auto"
										height="170px"
									/>
									<h5>{p.name}</h5>
									<label className="label-names">
										<strong>Precio: ${p.precio}</strong>
									</label>
									<br />
									<label className="label-names">
										<strong>Unidades disponibles: {p.disponible}</strong>
									</label>
									<div className="container more-options">
										<Link to={"/detail_product/" + p.id}>
											<button className="btn1 btn-primary">Ver Más</button>
										</Link>
										<button
											className="btn1 btn-warning"
											onClick={() => payProducts(p, p.quantity)}
										>
											Añadir
										</button>
										
										<input
											type="text"
											min="1"
											className="number-product"
											/*onChange={() => handleChange(p)}*/
											value={p.quantity}
											readOnly={true}
										/>
										<button onClick={() => handlePlus(p)} className="countMax"><div className="txtPlus">+</div></button>
										<button onClick={() => handleMinor(p)} className="countMin" ><div className="txtMin">-</div></button>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
