// ? 1. Import Axios dulu
import axios from "axios";
import FormAddProduct from "./components/FormAddProduct";
import FormLogin from "./components/FormLogin";
import TableListProduct from "./components/TableListProduct";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000";

const App = () => {
  // ? 2. Bikin statenya dulu
  const [products, setProducts] = useState([]);
  // ? Bikin state lagi untuk menyatakan oran sudah masuk belum
  const [sudahMasuk, setSudahMasuk] = useState(false);

  // ? Login:
  // ? Ke POST http://localhost:3000/login
  // ? Berikan { email & password }

  const fetchProducts = async () => {
    // Comot data dari localhost:3000/products (GET)
    // Mendapatkan axios Response
    // destructuring untuk mendapatkan data yang diinginkan
    const { data } = await axios.get(`${BASE_URL}/products`);

    setProducts(data.data);
  };

  // ? 3. Gunakan useEffect untuk nge-fetch data
  useEffect(
    // Callback Handler
    () => {
      // Bikin fungsi untuk fetch datanya.
      fetchProducts();
    },
    // Dependency Lists
    // Karena cuman pengen sekali, jadinya array kosong !
    []
  );

  // ? 4. Gunakan suatu pengecekan, apakah localStorage si_token sudah ada belum?
  useEffect(() => {
    // ? Cek si localStorage
    const token = localStorage.getItem("si_token");

    if (token) {
      setSudahMasuk(true);
    }
  }, []);

  // ? 5. Bikin logic untuk nambahin product (POST /products)
  const fnPenambahProduk = async (pName, pPrice) => {
    const siToken = localStorage.getItem("si_token");

    const { data } = await axios.post(
      "http://localhost:3000/products",
      {
        name: pName,
        price: pPrice,
      },
      {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${siToken}`,
        },
      }
    );

    console.log(data);

    // ! Seharusnya di sini nanti kita harus ...... FETCH DATA ULANG !
    await fetchProducts();
  };

  return (
    <>
      <main className="bg-gray-100 w-full min-h-dvh flex flex-col gap-4 justify-center items-center">
        {/* Form Login */}
        {/* // ? Kalau sudah masuk, jangan ditampilkan lagi */}
        {!sudahMasuk && (
          <section className="bg-emerald-100 p-4 w-1/4 rounded-lg">
            <FormLogin fnStateUdahMasuk={setSudahMasuk} />
          </section>
        )}

        {/* Add Product */}
        {/* // ? Selama belum masuk, jangan tampilkan add product */}
        {sudahMasuk && (
          <section className="bg-red-100 p-4 rounded-lg w-1/4">
            <FormAddProduct tambahProduk={fnPenambahProduk} />
          </section>
        )}

        {/* List Product */}
        <section className="bg-gray-400 p-4 rounded-lg w-1/3">
          {/* // ? 4. Test dulu datanya ada gak? */}
          <TableListProduct sebutSajaNamanyaProduk={products} />
        </section>
      </main>
    </>
  );
};

export default App;
