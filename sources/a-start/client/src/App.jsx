import FormAddProduct from "./components/FormAddProduct";
import FormLogin from "./components/FormLogin";
import TableListProduct from "./components/TableListProduct";

const App = () => {
	return (
		<>
			<main className="bg-gray-100 w-full min-h-dvh flex flex-col gap-4 justify-center items-center">
				{/* Form Login */}
				<section className="bg-emerald-100 p-4 w-1/4 rounded-lg">
					<FormLogin />
				</section>

				{/* Add Product */}
				<section className="bg-red-100 p-4 rounded-lg w-1/4">
					<FormAddProduct />
				</section>

				{/* List Product */}
				<section className="bg-gray-400 p-4 rounded-lg w-1/4">
					<TableListProduct />
				</section>
			</main>
		</>
	);
};

export default App;
