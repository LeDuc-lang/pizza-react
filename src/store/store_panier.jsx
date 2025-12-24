import { createContext, useReducer, useEffect } from "react";
import { fetchPizzas } from "../services/pizza_service";

export const StoreContext = createContext();

const initialState = {
  pizzas: [],
  panier: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PIZZAS":
      return {
        ...state,
        pizzas: action.payload,
        loading: false,
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
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

  // Charger les pizzas au montage du composant
  useEffect(() => {
    async function loadPizzas() {
      try {
        const pizzas = await fetchPizzas();
        dispatch({ type: "SET_PIZZAS", payload: pizzas });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    }
    
    loadPizzas();
  }, []);

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