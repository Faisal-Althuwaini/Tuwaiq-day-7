import React, { useEffect, useReducer } from "react";
import Header from "../components/Header";

function Products() {
  // const initialState = {
  //   counter: 0,
  // };

  const initialState = {
    isLoading: false,
    data: [],
    error: "",
  };

  const ProductsReducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          isLoading: true,
        };
      case "success":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };

      case "error":
        return {
          ...state,
          error: action.payload,
        };

      default:
        throw Error("Unknown action: " + action.type);
    }
  };

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "increament":
  //       return {
  //         ...state,
  //         counter: state.counter + action.payload,
  //       };
  //     case "decreament":
  //       return {
  //         ...state,
  //         counter: state.counter - action.payload,
  //       };
  //     case "reset":
  //       return initialState;

  //     default:
  //       throw Error("Unknown action: " + action.type);
  //   }
  // };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const FetchData = async () => {
    try {
      dispatch({ type: "loading" });
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch({ type: "success", payload: data });
    } catch {
      dispatch({ type: "error", payload: "Error during fetch" });
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div>
      <Header />
      <h1 className="text-center mt-4"> Product list</h1>
      {state.data.length > 0 ? (
        <h4 className="text-center">Products is here</h4>
      ) : null}
      {state.isLoading && <h3 className="text-center">Loading...</h3>}
      {state.error && <p className="text-center text-danger">{state.error}</p>}
      {/* <h4 className="text-center">Counter: {state.counter}</h4>
      <div className="container d-flex justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: "increament", payload: 5 })}
        >
          Increament
        </button>
        <button
          className="btn btn-info mx-4"
          onClick={() => dispatch({ type: "decreament", payload: 5 })}
        >
          Decreament
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </div> */}
    </div>
  );
}

export default Products;
