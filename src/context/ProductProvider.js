import React, { createContext, useContext, useEffect, useState } from "react";

const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const data = {
    products,
  };

  return (
    <PRODUCT_CONTEXT.Provider value={data}>{children}</PRODUCT_CONTEXT.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(PRODUCT_CONTEXT);
  return context;
};

export default ProductProvider;
