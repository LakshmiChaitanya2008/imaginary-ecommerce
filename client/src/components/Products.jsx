import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async function () {
      const data = await axios.get("http://localhost:5000/products");

      setProducts(data.data);
      setFilteredProducts(data.data);
    };
    getAllProducts();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const categories = [...new Set(filteredProducts.map((p) => p.category))];

  return (
    <div className="mb-20 mx-auto max-w-6xl ">
      <input
        className="w-full outline-none  bg-gray-100 rounded-lg  p-2"
        placeholder="Search for Anything"
        value={searchTerm}
        onChange={handleSearch}
      ></input>

      {categories.sort().map((c) => (
        <div key={c}>
          <h1 className="text-2xl font-bold my-3">{c}</h1>
          <div className="flex justify-start gap-4 flex-wrap">
            {filteredProducts
              .filter((p) => p.category === c)

              .map((p) => (
                <Product {...p} id={p._id} key={p.name} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
