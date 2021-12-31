import { useState } from "react";

function AddItem(props) {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [type, setType] = useState("");
	const [brand, setBrand] = useState("");

	const addItemBtnPressed = () => {
		props.addItem({
			name: name,
			price: price,
			type: type,
			brand: brand
		});
		setName("");
		setPrice(0);
		setType("");
		setBrand("");
	};

	return (
		<div>
			<h2>Search Item</h2>
			<form>
				<label htmlFor="name-field">Name:</label>
				<input
					id="name-field"
					type="text"
					value={name}
					onChange={ (e) => setName(e.target.value) }
				/>
				<label htmlFor="price-field">Max Price:</label>
				<input
					id="price-field"
					type="number"
					value={price}
					onChange={ (e) => setPrice(e.target.value) }
				/>
				<label htmlFor="type-field">Type:</label>
				<input
					id="type-field"
					type="text"
					value={type}
					onChange={ (e) => setType(e.target.value) }
				/>
				<label htmlFor="brand-field">Brand:</label>
				<input
					id="brand-field"
					type="text"
					value={brand}
					onChange={ (e) => setBrand(e.target.value) }
				/>
				<button type="button" onClick={addItemBtnPressed}>
					Add Item
				</button>
			</form>
			<p>Name: {name}</p>
			<p>Max Price: {price}</p>
			<p>Type: {type}</p>
			<p>Brand: {brand}</p>
		</div>
	);
}

export default AddItem
