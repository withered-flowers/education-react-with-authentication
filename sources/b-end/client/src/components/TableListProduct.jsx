/* eslint-disable react/prop-types */
const TableListProduct = ({ sebutSajaNamanyaProduk }) => {
  return (
    <table className="text-slate-100 mx-auto">
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
      <tbody>
        {/* // ! TODO: Implement Listing Here ! */}
        {/* // ? LOOPING Data ! */}
        {sebutSajaNamanyaProduk.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.updatedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableListProduct;
