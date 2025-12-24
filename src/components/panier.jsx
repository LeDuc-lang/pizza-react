import { useContext } from "react";
import { StoreContext } from "../store/store_panier.jsx";

export default function Panier() {
  const { state, dispatch, getTotal, getTotalPizzas } = useContext(StoreContext);
  const panierVide = state.panier.length === 0;

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: index });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { index, quantity: newQuantity }
      });
    }
  };

  return (
    <div className="panier-container" id="panier">
      <h1>🛒 Mon Panier</h1>

      {panierVide ? (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
          Votre panier est vide 😢
        </p>
      ) : (
        <>
          <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            <strong>{getTotalPizzas()} pizza(s)</strong> dans le panier
          </p>
          <ul>
            {state.panier.map((item, index) => (
              <li key={index} className="panier-item">
                <div className="panier-item-info">
                  <strong>{item.name}</strong>
                  <div style={{ color: '#666' }}>
                    {item.price.toFixed(2)}€ × {item.quantity} = <strong>{(item.price * item.quantity).toFixed(2)}€</strong>
                  </div>
                </div>
                <div className="panier-item-controls">
                  <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>
                    −
                  </button>
                  <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '600' }}>
                    {item.quantity}
                  </span>
                  <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                    +
                  </button>
                  <button 
                    onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: index })}
                    style={{ background: '#e63946' }}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="panier-total">
            <h2>Total: {getTotal()}€</h2>
          </div>
          <div className="panier-actions">
            <button 
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              style={{ background: '#666' }}
            >
              Vider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
}