import { useContext } from "react";
import { StoreContext } from "../store/store_panier.jsx";

export default function Navbar() {
  const { getTotalPizzas } = useContext(StoreContext);

  return (
    <nav>
      <a className="navbar-brand" href="/">
        🍕 Pizza World
      </a>
      <ul>
        <li>
          <a href="/">Accueil</a>
        </li>
        <li>
          <a href="#panier">
            🛒 Panier
            <span className="cart-badge">{getTotalPizzas()}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}