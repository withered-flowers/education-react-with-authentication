/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const FormLogin = ({ fnStateUdahMasuk }) => {
  const [formDataState, setFormDataState] = useState({
    email: "admin@mail.com",
    password: "123123",
  });

  const formLoginSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("Ketrigger donk postnya");

    // ? Saatnya tembak ke POST http://localhost:3000/login
    const { data } = await axios.post(
      "http://localhost:3000/login",
      {
        email: formDataState.email,
        password: formDataState.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);

    // Simpan si token di localStorage
    localStorage.setItem("si_token", data.data.token);
    localStorage.setItem("iseng_aja_lah", "cuman iseng belaka");

    fnStateUdahMasuk(true);
  };

  return (
    <form
      onSubmit={formLoginSubmitHandler}
      className="flex flex-col gap-4 text-slate-500"
    >
      <h1 className="text-2xl text-center">Login Form</h1>
      <input
        className="py-2 px-4 rounded-lg"
        type="text"
        placeholder="Username"
        value={formDataState.email}
        onChange={(evt) => {
          setFormDataState({
            ...formDataState,
            email: evt.target.value,
          });
        }}
      />
      <input
        className="py-2 px-4 rounded-lg"
        type="password"
        placeholder="Password"
        value={formDataState.password}
        onChange={(evt) => {
          setFormDataState({
            ...formDataState,
            password: evt.target.value,
          });
        }}
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
