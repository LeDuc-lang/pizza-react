# 🍕 Pizza React - Application de Commande de Pizzas

Application web moderne de commande de pizzas développée avec **React**, **Vite**, et intégrant un chatbot intelligent propulsé par **Ollama** (IA locale).

## 📋 Table des matières

- [Aperçu du projet](#-aperçu-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Architecture](#-architecture)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancement du projet](#-lancement-du-projet)
- [Structure du projet](#-structure-du-projet)
- [API](#-api)
- [Utilisation](#-utilisation)
- [Développement](#-développement)

---

## 🎯 Aperçu du projet

Pizza React est une application e-commerce complète permettant aux utilisateurs de :
- Parcourir un menu de pizzas stocké dans une base de données PostgreSQL
- Ajouter/retirer des pizzas dans un panier avec gestion des quantités
- Interagir avec un chatbot IA pour obtenir des recommandations personnalisées
- Gérer leur commande via une interface intuitive

Le projet utilise une architecture moderne avec React pour le frontend, Express.js pour l'API backend, PostgreSQL pour la persistance des données, et Ollama pour l'intelligence artificielle conversationnelle.

---

## ✨ Fonctionnalités

### 🛒 Gestion du panier
- **Ajout de pizzas au panier** avec validation
- **Boutons +/- pour ajuster les quantités** de chaque pizza
- **Affichage du nombre total d'articles** dans la navbar
- **Store Zustand/Context** pour la gestion d'état globale du panier
- **Calcul automatique du prix total**

### 🍕 Catalogue de pizzas
- **Liste complète des pizzas** avec nom, prix et image
- **Données dynamiques** chargées depuis PostgreSQL
- **Interface responsive** et moderne

### 🤖 Chatbot intelligent
- **Assistant virtuel** propulsé par Ollama (modèle qwen2.5:0.5b)
- **Recommandations personnalisées** basées sur le menu disponible
- **Interface de chat** intuitive avec historique des messages
- **Contexte de conversation** incluant les pizzas disponibles

### 🧭 Navigation
- **Navbar persistante** avec accès au menu et au panier
- **Indicateur visuel** du nombre d'articles dans le panier
- **Design moderne** et épuré

---

## 🛠 Technologies utilisées

### Frontend
- **React 19.2** - Bibliothèque UI
- **Vite 7.2** - Build tool et dev server ultra-rapide
- **CSS moderne** - Styling personnalisé

### Backend
- **Express.js 4.22** - Serveur API REST
- **PostgreSQL 16** - Base de données relationnelle
- **node-postgres (pg)** - Client PostgreSQL pour Node.js

### Intelligence Artificielle
- **Ollama** - Runtime pour modèles IA en local
- **qwen2.5:0.5b** - Modèle de langage léger et performant

### DevOps
- **Docker & Docker Compose** - Containerisation des services
- **ESLint** - Linting du code JavaScript
- **Concurrently** - Exécution simultanée de scripts npm

---

## 🏗 Architecture

```
┌─────────────────┐
│  React Frontend │ (Port 5173)
│   (Vite Dev)    │
└────────┬────────┘
         │
         ├──────────► API Express (Port 3001)
         │                    │
         │                    ▼
         │            ┌───────────────┐
         │            │  PostgreSQL   │ (Port 5432)
         │            │   Database    │
         │            └───────────────┘
         │
         └──────────► Ollama API (Port 11434)
                              │
                              ▼
                      ┌───────────────┐
                      │  Qwen2.5:0.5b │
                      │     Model     │
                      └───────────────┘
```

### Services Docker
- **ollama_llm** : Serveur Ollama pour l'IA
- **ollama_pull** : Container temporaire pour télécharger le modèle
- **qwen_postgres** : Base de données PostgreSQL

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** >= 18.x ([Télécharger](https://nodejs.org/))
- **npm** >= 9.x (inclus avec Node.js)
- **Docker** >= 20.x ([Télécharger](https://www.docker.com/))
- **Docker Compose** >= 2.x (inclus avec Docker Desktop)
- **Git** ([Télécharger](https://git-scm.com/))

Vérification des versions :
```bash
node --version
npm --version
docker --version
docker compose version
```

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/LeDuc-lang/pizza-react.git
cd pizza-react
```

### 2. Installer les dépendances npm

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier le fichier exemple et le personnaliser :

```bash
cp .env.sample .env
```

Contenu du fichier `.env` :

```bash
# Connexion à Ollama (Docker)
VITE_OLLAMA_API=http://localhost:11434

# Connexion à PostgreSQL (Docker)
VITE_DB_HOST=localhost
VITE_DB_PORT=5432
VITE_DB_NAME=chatbot
VITE_DB_USER=chatbot
VITE_DB_PASSWORD=chatbot
```

---

## ⚙️ Configuration

### Base de données

Les scripts SQL d'initialisation se trouvent dans `db/init/` :

- **01-schema.sql** : Création de la table `pizza`
- **02-mock-data.sql** : Insertion des données de test

Ces scripts sont automatiquement exécutés au démarrage du container PostgreSQL.

### Modèle IA

Le modèle **qwen2.5:0.5b** est automatiquement téléchargé au premier lancement via le service `ollama-pull`.

Taille du modèle : ~350 MB

---

## 🎬 Lancement du projet

### Méthode 1 : Lancement complet (recommandé)

```bash
# 1. Démarrer les services Docker (PostgreSQL + Ollama)
docker compose up -d

# 2. Attendre que le modèle soit téléchargé (30-60 secondes)
docker logs ollama_pull -f

# 3. Vérifier que les services sont prêts
docker ps

# 4. Lancer le frontend ET l'API simultanément
npm run dev:all
```

L'application est accessible sur **http://localhost:5173**  
L'API est accessible sur **http://localhost:3001**

### Méthode 2 : Lancement séparé

Dans 3 terminaux différents :

```bash
# Terminal 1 : Services Docker
docker compose up

# Terminal 2 : API Backend
npm run api

# Terminal 3 : Frontend React
npm run dev
```

### Arrêt des services

```bash
# Arrêter l'application React/API
Ctrl+C dans les terminaux

# Arrêter les containers Docker
docker compose down

# Arrêter et supprimer les volumes (reset complet)
docker compose down -v
```

---

## 📁 Structure du projet

```
pizza-react/
├── api/
│   └── pizzas.js              # API Express pour les pizzas
├── db/
│   └── init/
│       ├── 01-schema.sql      # Schéma de la base de données
│       └── 02-mock-data.sql   # Données de test
├── public/                     # Assets statiques
├── src/
│   ├── components/
│   │   ├── navbar.jsx         # Barre de navigation
│   │   ├── pizza_liste.jsx    # Liste des pizzas
│   │   ├── pizza_items.jsx    # Carte d'une pizza
│   │   ├── button_plus_moins.jsx  # Boutons +/-
│   │   ├── button_commande.jsx    # Bouton d'ajout au panier
│   │   ├── panier.jsx         # Vue du panier
│   │   ├── chatbot_button.jsx # Bouton d'ouverture du chat
│   │   └── chat_window.jsx    # Fenêtre de chat
│   ├── services/
│   │   ├── pizza_service.js   # Service pour les pizzas
│   │   ├── db_service.js      # Service base de données
│   │   └── chat_service.js    # Service Ollama
│   ├── store/
│   │   └── store_panier.jsx   # Store du panier (Context API)
│   ├── styles/
│   │   └── chatbot.css        # Styles du chatbot
│   ├── main.jsx               # Point d'entrée React
│   └── index.css              # Styles globaux
├── docker-compose.yml         # Configuration Docker
├── vite.config.js             # Configuration Vite
├── package.json               # Dépendances npm
├── .env                       # Variables d'environnement
└── README.md                  # Ce fichier
```

---

## 🔌 API

### Endpoints disponibles

#### `GET /api/pizzas`

Récupère la liste complète des pizzas.

**Réponse** :
```json
[
  {
    "name": "Margherita",
    "price": 9.99,
    "image_url": "https://example.com/margherita.jpg"
  },
  {
    "name": "Regina",
    "price": 11.99,
    "image_url": "https://example.com/regina.jpg"
  }
]
```

### API Ollama

#### `POST http://localhost:11434/api/generate`

Génère une réponse du chatbot.

**Body** :
```json
{
  "model": "qwen2.5:0.5b",
  "prompt": "Quelle pizza me recommandez-vous ?",
  "stream": false
}
```

---

## 💡 Utilisation

### Parcourir le menu
1. Ouvrez l'application sur **http://localhost:5173**
2. Les pizzas s'affichent automatiquement depuis la base de données

### Ajouter au panier
1. Cliquez sur le bouton **"Ajouter au panier"** d'une pizza
2. Utilisez les boutons **+** et **-** pour ajuster la quantité
3. Le compteur dans la navbar se met à jour

### Utiliser le chatbot
1. Cliquez sur le bouton de chat en bas à droite
2. Posez une question (ex: "Quelle pizza recommandes-tu ?")
3. Le bot répond en tenant compte du menu disponible

### Consulter le panier
1. Cliquez sur l'icône panier dans la navbar
2. Visualisez vos pizzas et le total
3. Modifiez les quantités ou supprimez des articles

---

## 👨‍💻 Développement

### Scripts disponibles

```bash
# Développement frontend uniquement
npm run dev

# Lancer l'API uniquement
npm run api

# Lancer frontend + API simultanément
npm run dev:all

# Build de production
npm run build

# Preview du build
npm run preview

# Linting
npm run lint
```

### Vérification des services

```bash
# État des containers Docker
docker ps

# Logs d'Ollama
docker logs ollama_llm

# Logs de PostgreSQL
docker logs qwen_postgres

# Tester la connexion PostgreSQL
docker exec -it qwen_postgres psql -U chatbot -d chatbot -c "SELECT * FROM pizza;"

# Lister les modèles Ollama
docker exec -it ollama_llm ollama list

# Tester l'API Ollama
curl http://localhost:11434/api/tags
```

### Debugging

Si le chatbot ne fonctionne pas :

```bash
# 1. Vérifier qu'Ollama tourne
curl http://localhost:11434/api/tags

# 2. Vérifier que le modèle est téléchargé
docker exec -it ollama_llm ollama list

# 3. Re-télécharger le modèle si nécessaire
docker exec -it ollama_llm ollama pull qwen2.5:0.5b

# 4. Tester manuellement
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen2.5:0.5b","prompt":"Hello","stream":false}'
```

---

## 📄 Licence

Ce projet est développé dans un cadre éducatif.

---

## 👤 Auteur

**LeDuc-lang**  
GitHub: [@LeDuc-lang](https://github.com/LeDuc-lang)

---

## 🙏 Remerciements

- React & Vite pour l'excellent DX
- Ollama pour rendre l'IA accessible localement
- La communauté open source