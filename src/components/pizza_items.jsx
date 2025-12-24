import { useContext } from "react";
import { StoreContext } from "../store/store_panier.jsx";

function PizzaItem({ name, price }) {
  const { state, dispatch } = useContext(StoreContext);

  const pizzaInCart = state.panier.find((item) => item.name === name);
  const quantity = pizzaInCart ? pizzaInCart.quantity : 0;
  const indexInCart = state.panier.findIndex((item) => item.name === name);

  const handlePlus = () => {
    if (pizzaInCart) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { index: indexInCart, quantity: quantity + 1 },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: { name, price, quantity: 1 },
      });
    }
  };

  const handleMoins = () => {
    if (quantity === 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: indexInCart });
    } else if (quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { index: indexInCart, quantity: quantity - 1 },
      });
    }
  };

  return (
    <li>
      <strong>🍕 {name}</strong>
      <span style={{ color: '#e63946', fontSize: '1.1rem', fontWeight: '600' }}>
        {price.toFixed(2)}€
      </span>
      <div className="quantity-controls">
        <button onClick={handleMoins} disabled={quantity === 0}>
          −
        </button>
        <input type="number" value={quantity} readOnly />
        <button onClick={handlePlus}>
          +
        </button>
      </div>
    </li>
  );
}

export default function PizzaItems() {
  const { state } = useContext(StoreContext);

  return (
    <ul>
      {state.pizzas.map((pizza) => (
        <PizzaItem key={pizza.name} name={pizza.name} price={pizza.price} />
      ))}
    </ul>
  );
}