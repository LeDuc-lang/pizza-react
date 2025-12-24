import { useContext } from "react";
import { StoreContext } from "../store/store_panier.jsx";

export default function Button() {
  const { state, dispatch, getTotal, getTotalPizzas } = useContext(StoreContext);

  const handleCommander = () => {
    if (state.panier.length > 0) {
      alert(`🎉 Commande validée !\n\n${getTotalPizzas()} pizza(s)\nTotal : ${getTotal()}€\n\nMerci pour votre commande !`);
      dispatch({ type: "CLEAR_CART" });
    } else {
      alert("❌ Votre panier est vide !");
    }
  };

  return (
    <button
      className="commander-btn"
      onClick={handleCommander}
      disabled={state.panier.length === 0}
    >
      🛒 Passer la commande
    </button>
  );
}