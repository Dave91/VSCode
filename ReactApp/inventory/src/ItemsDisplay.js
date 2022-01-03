
function ItemsDisplay({ items, deleteItem }) {
	const showItem = (item) => {
		return (
			<tr>
				<th>Id: {item.id}</th>
				<td>Name: {item.name}</td>
				<td>Price: {item.price}</td>
				<td>Type: {item.type}</td>
				<td>Brand: {item.brand}</td>
				<td>
					<button className="btn btn-danger"
						onClick={() => deleteItem(item)}>
							Delete
					</button>
				</td>
			</tr>
		);
	};
	return (
		<div className="container">
			<div className="row">
				<h2>Items</h2>
			</div>
			<div className="row">
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Id</th>
							<th scope="col">Name</th>
							<th scope="col">Price</th>
							<th scope="col">Type</th>
							<th scope="col">Brand</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{items.map(showItem)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ItemsDisplay;
