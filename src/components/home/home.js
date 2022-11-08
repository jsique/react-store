import React from "react";
import "../../assets/css/home.css";
import NavBar from "../navBar";
import { getProducts } from "../../services/api.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import {  useNavigate } from "react-router-dom";

function Home() {
	const [products, setProdcuts] = useState([]);
	//const navigate = useNavigate();
	const [filteredList, setFilteredList] = useState([]);
	const [shopCar, setShopCar] = useState([]);

	var [quantity, setQuantity] = useState(1);
	//let refValueInput = useRef();

	const getProductsData = async () => {
		const p = await getProducts();
		//console.log(p.docs);
		const data = p.docs.map((doc) => {
			return {
				id: doc.id,
				quantity: 0,
				...doc.data(),
			};
		});
		setProdcuts(data);
		setFilteredList(data);
	};
	useEffect(() => {
		getProductsData();
		//setFilteredList(products);
	}, []);

	useEffect(() => {
		console.log("shopCAr update", shopCar);
	}, [shopCar]);

	/*useEffect(() =>{
        console.log("actualizanod valor",refValueInput.value);
    }, [refValueInput]);*/

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

	let payProducts = (prmProduct, value) => {
		console.log("prmProduct", prmProduct);
		console.log("value", value);
		console.log("value", shopCar);
		var prodTemp = {
			idProduct: prmProduct.id,
			nameProduct: prmProduct.name,
			priceProduct: prmProduct.precio,
			quantity: prmProduct.quantity,
			nameImage: prmProduct.img_name,
		}; //
		setShopCar([...shopCar, prodTemp]);
		// //console.log("refValueInput:"+refValueInput.current.value);
		// console.log("VALUE:"+value);
		// //console.log("e:"+e);
		// var prodTemp =
		//     {
		//         "idProduct"     : prmProduct.id,
		//         "nameProduct"   : prmProduct.data().name,
		//         "priceProduct"  : prmProduct.data().precio,
		//         "quantity"      : value,
		//         "nameImage"     : prmProduct.data().img_name
		//     }; //
		// //shopCar.push(prodTemp);
		// setQuantity(1);
	};

	const showShopoCar = () => {
		console.log("value", shopCar);
	};
	const handleChange = (e) => {
		//console.log("called handle changed");
		// setQuantity(e.target.value);
		const item = products.find((product) => product.id == e.id);
		console.log("item found", item);
		const newItems = products.filter((product) => product.id != e.id);
		setProdcuts([...newItems, { quantity: (e.quantity++), ...e }]);
	};

	return (
		<div id="home" className="">
			<NavBar />
			<div className="navbar1 content ">
				<nav className="navbar navbar-expand-lg navbar-light navbar2">
					<div className="container-fluid">
						<h3>Catálogo de productos</h3>
					</div>
					<div className="form-inline">
						<label>¿Qué estás buscando? {shopCar.length}</label>
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
											type="number"
											min="1"
											className="number-product"
											onChange={() => handleChange(p)}
											value={p.quantity}
										/>
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
