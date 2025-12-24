const DB_CONFIG = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  port: import.meta.env.VITE_DB_PORT || 5432,
  database: import.meta.env.VITE_DB_NAME || 'chatbot',
  user: import.meta.env.VITE_DB_USER || 'chatbot',
  password: import.meta.env.VITE_DB_PASSWORD || 'chatbot',
};

// Fonction pour récupérer les pizzas depuis PostgreSQL
export async function fetchPizzasFromDB() {
  try {
    // Utilisation d'une API proxy (voir ci-dessous)
    const response = await fetch('/api/pizzas');
    
    if (!response.ok) {
      throw new Error(`Erreur DB: ${response.status}`);
    }
    
    const pizzas = await response.json();
    return pizzas;
  } catch (error) {
    console.error('Erreur lors de la récupération des pizzas:', error);
    // Fallback sur les données par défaut
    return [
      { name: "Margherita", price: 8.99 },
      { name: "Pepperoni", price: 10.99 },
      { name: "Quattro Formaggi", price: 12.99 },
      { name: "Vegetariana", price: 11.49 },
      { name: "Hawaiana", price: 11.99 },
      { name: "Calzone", price: 13.49 },
      { name: "Diavola", price: 12.49 },
      { name: "Napolitana", price: 9.99 },
    ];
  }
}