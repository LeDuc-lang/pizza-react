import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PizzaListe from "./components/pizza_liste.jsx";
import Navbar from "./components/navbar.jsx";
import { StoreProvider } from "./store/store_panier.jsx";
import Panier from "./components/panier.jsx";
import Button from "./components/button_commande.jsx";
import ChatbotButton from "./components/chatbot_button.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <>
        <Navbar />
        <h1>Pizza World</h1>
        <div>
          <PizzaListe />
        </div>
        <Button />
        <Panier />
        <ChatbotButton />
      </>
    </StoreProvider>
  </StrictMode>
);
