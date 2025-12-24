import { createContext, useReducer } from "react";

export const StoreContext = createContext();

const initialState = {
  pizzas: [
    { name: "Margherita", price: 8.99 },
    { name: "Pepperoni", price: 9.99 },
    { name: "Hawaii", price: 10.99 },
    { name: "Salami", price: 9.49 },
    { name: "Funghi", price: 8.49 },
    { name: "Tonno", price: 10.49 },
    { name: "Quattro Formaggi", price: 11.99 }
  ],
  panier: []
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        panier: [...state.panier, action.payload]
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        panier: state.panier.filter((_, index) => index !== action.payload)
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        panier: state.panier.map((item, index) =>
          index === action.payload.index
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case "CLEAR_CART":
      return {
        ...state,
        panier: []
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Calculer le total
  const getTotal = () => {
    return state.panier.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  // Calculer le nombre total de pizzas
  const getTotalPizzas = () => {
    return state.panier.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, getTotal, getTotalPizzas }}>
      {children}
    </StoreContext.Provider>
  );
}