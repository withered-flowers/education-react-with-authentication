import { useState } from "react";

/* eslint-disable react/prop-types */
const FormAddProduct = ({ tambahProduk }) => {
  const [formState, setFormState] = useState({
    productName: "",
    productPrice: "",
  });

  const formAddProductSubmitHandler = (event) => {
    event.preventDefault();

    // 1. pName
    // 2. pPrice
    tambahProduk(formState.productName, formState.productPrice);
  };

  return (
    <form
      onSubmit={formAddProductSubmitHandler}
      className="flex flex-col gap-4 text-slate-500"
    >
      <h1 className="text-2xl text-center">Add Product Form</h1>
      <input
        className="py-2 px-4 rounded-lg"
        type="text"
        placeholder="Product Name"
        value={formState.productName}
        onChange={(evt) => {
          setFormState({
            ...formState,
            productName: evt.target.value,
          });
        }}
      />
      <input
        className="py-2 px-4 rounded-lg"
        type="number"
        placeholder="Product Price"
        value={formState.productPrice}
        onChange={(evt) => {
          setFormState({
            ...formState,
            productPrice: evt.target.value,
          });
        }}
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
