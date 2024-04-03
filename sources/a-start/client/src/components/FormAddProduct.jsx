const FormAddProduct = () => {
	return (
		<form className="flex flex-col gap-4 text-slate-500">
			<h1 className="text-2xl text-center">Add Product Form</h1>
			<input
				className="py-2 px-4 rounded-lg"
				type="text"
				placeholder="Product Name"
			/>
			<input
				className="py-2 px-4 rounded-lg"
				type="number"
				placeholder="Product Price"
			/>
			<button
				className="py-2 px-4 w-1/2 bg-red-400/80 text-white/80 hover:bg-red-400 hover:text-white transition-colors duration-300 rounded-lg mx-auto"
				type="submit"
			>
				Add Product
			</button>
		</form>
	);
};

export default FormAddProduct;
