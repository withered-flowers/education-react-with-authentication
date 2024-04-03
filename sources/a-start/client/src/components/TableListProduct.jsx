const TableListProduct = () => {
	return (
		<table className="text-slate-500 mx-auto">
			<thead>
				<tr>
					<th colSpan="4">
						<h1 className="text-2xl font-normal text-center">List Product</h1>
					</th>
				</tr>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Price</th>
					<th>Last Updated</th>
				</tr>
			</thead>
			<tbody>{/* // ! TODO: Implement Listing Here ! */}</tbody>
		</table>
	);
};

export default TableListProduct;
