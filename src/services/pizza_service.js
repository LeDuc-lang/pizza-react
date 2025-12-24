// Cache pour éviter de refaire les appels
let cachedPizzas = null;

export async function fetchPizzas() {
  // Si on a déjà les données en cache, on les retourne
  if (cachedPizzas) {
    return cachedPizzas;
  }

  try {
    const response = await fetch('/api/pizzas');
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const pizzas = await response.json();
    cachedPizzas = pizzas; // Mise en cache
    return pizzas;
  } catch (error) {
    console.error('Erreur lors de la récupération des pizzas:', error);
    
    // Fallback sur les données par défaut
    const defaultPizzas = [
      { name: "Margherita", price: 8.99, image_url: null },
      { name: "Pepperoni", price: 10.99, image_url: null },
      { name: "Quattro Formaggi", price: 12.99, image_url: null },
      { name: "Vegetariana", price: 11.49, image_url: null },
      { name: "Hawaiana", price: 11.99, image_url: null },
      { name: "Calzone", price: 13.49, image_url: null },
      { name: "Diavola", price: 12.49, image_url: null },
      { name: "Napolitana", price: 9.99, image_url: null },
    ];
    
    cachedPizzas = defaultPizzas;
    return defaultPizzas;
  }
}

// Pour forcer un refresh si besoin
export function clearPizzasCache() {
  cachedPizzas = null;
}

// Pour obtenir une pizza spécifique
export async function getPizzaByName(name) {
  const pizzas = await fetchPizzas();
  return pizzas.find(p => p.name.toLowerCase() === name.toLowerCase());
}

// Pour obtenir les pizzas dans une gamme de prix
export async function getPizzasByPriceRange(minPrice, maxPrice) {
  const pizzas = await fetchPizzas();
  return pizzas.filter(p => p.price >= minPrice && p.price <= maxPrice);
}