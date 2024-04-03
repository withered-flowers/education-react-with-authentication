const FormLogin = () => {
	return (
		<form className="flex flex-col gap-4 text-slate-500">
			<h1 className="text-2xl text-center">Login Form</h1>
			<input
				className="py-2 px-4 rounded-lg"
				type="text"
				placeholder="Username"
			/>
			<input
				className="py-2 px-4 rounded-lg"
				type="password"
				placeholder="Password"
			/>
			<button
				className="py-2 px-4 w-1/2 bg-blue-200 hover:bg-blue-400 hover:text-white transition-colors duration-300 rounded-lg mx-auto"
				type="submit"
			>
				Login
			</button>
		</form>
	);
};

export default FormLogin;
