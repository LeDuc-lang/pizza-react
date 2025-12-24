const OLLAMA_API_URL = import.meta.env.VITE_OLLAMA_API || 'http://localhost:11434';

export function sendMessageToOllama(message) {
  return fetch(`${OLLAMA_API_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen2.5:0.5b',
      prompt: `Tu es un assistant pour une pizzeria. Voici la question du client: ${message}. Réponds de manière amicale et utile.`,
      stream: false,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.response)
    .catch(error => {
      console.error('Erreur Ollama:', error);
      throw error;
    });
}

export function sendMessageWithContext(message, pizzas) {
  alert('TEST - la fonction est appelée');

  const pizzaList = pizzas.map(p => `${p.name} - ${p.price}€`).join(', ');
  
  console.log('OLLAMA_API_URL:', OLLAMA_API_URL);
  console.log('Full URL:', `${OLLAMA_API_URL}/api/generate`);
  console.log('Model:', 'qwen2.5:0.5b');

  return fetch(`${OLLAMA_API_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      model: 'qwen2.5:0.5b',
      prompt: `Tu es un assistant pour une pizzeria. Voici notre menu: ${pizzaList}. 
Question du client: ${message}
Réponds de manière amicale et recommande des pizzas si approprié.`,
      stream: false,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.response)
    .catch(error => {
      console.error('Erreur Ollama:', error);
      throw error;
    });
}