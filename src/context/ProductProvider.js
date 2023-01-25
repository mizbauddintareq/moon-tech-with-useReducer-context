import React, { createContext, useContext, useEffect, useState } from "react";
import { useReducer } from "react";
import { actionTypes } from "../state/productState/actionTypes";
import {
  initialState,
  productReducer,
} from "../state/productState/productReducer";

const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    dispatch({ type: actionTypes.FETCHING_START });
    fetch("products.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data })
      )
      .catch(() => {
        dispatch({ type: actionTypes.FETCHING_ERROR });
      });
  }, []);

  const authInfo = {
    state,
    dispatch,
    name: "mizba",
  };

  return (
    <PRODUCT_CONTEXT.Provider value={authInfo}>
      {children}
    </PRODUCT_CONTEXT.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(PRODUCT_CONTEXT);
  return context;
};

export default ProductProvider;
