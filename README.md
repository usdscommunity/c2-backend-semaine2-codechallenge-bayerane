# 📝 Todo API - NestJS

API REST complète de gestion de tâches construite avec NestJS, respectant les meilleures pratiques de développement backend.

## 🚀 Fonctionnalités

### CRUD de base
- ✅ **POST** `/todos` - Créer une tâche
- ✅ **GET** `/todos` - Lister toutes les tâches  
- ✅ **GET** `/todos/:id` - Récupérer une tâche par ID
- ✅ **PATCH** `/todos/:id` - Mettre à jour une tâche
- ✅ **DELETE** `/todos/:id` - Supprimer une tâche

### Filtres avancés
- 🔍 **Priorité** : `?priority=high|medium|low`
- 🏷️ **Tags** : `?tag=travail`
- ⭐ **Favoris** : `?isFavorite=true`
- 🔎 **Recherche** : `?search=urgent`

### Fonctionnalités bonus
- 📊 **GET** `/todos/stats` - Statistiques des tâches
- 📖 **Documentation Swagger** automatique
- ✅ **Validation** complète des données
- 🧪 **Tests unitaires** intégrés

## 🏗️ Architecture

### Structure modulaire
```
src/
├── main.ts                                 # Point d'entrée
├── app.module.ts                           # Module racine
├── common/
|   ├── exceptions/
|   |   └── todo-not-found.exception.ts     # Gestion des erreurs globales
└── todos/
    ├── todos.module.ts                     # Module des tâches
    ├── todos.controller.ts                 # Contrôleur REST
    ├── todos.service.ts                    # Logique métier
    ├── entities/
    │   └── todo.entity.ts                  # Modèle de données
    └── dto/
        ├── create-todo.dto.ts              # DTO création
        ├── update-todo.dto.ts              # DTO mise à jour
        └── filter-todo.dto.ts              # DTO filtrage
```

### Modèle de données
```typescript
{
  id: string,              // Identifiant unique auto-généré
  title: string,           // Titre (obligatoire)
  description?: string,    // Description (optionnel)
  priority: enum,          // low|medium|high (défaut: medium)
  tags: string[],          // Tableau de tags (défaut: [])
  isFavorite: boolean,     // Favori (défaut: false)
  isCompleted: boolean,    // Statut (défaut: false)
  createdAt: Date,         // Date de création
  updatedAt: Date          // Date de dernière modification
}
```

## 🛠️ Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run start:dev

# Build de production
npm run build
npm run start:prod

# Tests
npm test
npm run test:cov
```

## 📖 Documentation

Une fois l'application démarrée, la documentation Swagger est disponible sur :
**http://localhost:3000/api/docs**

## 🧪 Tests

```bash
# Tests unitaires
npm test

# Tests avec couverture
npm run test:cov

# Tests en mode watch
npm run test:watch
```

## 📝 Exemples d'utilisation

### Créer une tâche
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Finir le projet",
    "description": "Implémenter les dernières fonctionnalités",
    "priority": "high",
    "tags": ["travail", "urgent"],
    "isFavorite": true
  }'
```

### Filtrer les tâches
```bash
# Par priorité
curl "http://localhost:3000/todos?priority=high"

# Par tag
curl "http://localhost:3000/todos?tag=travail"

# Par favoris
curl "http://localhost:3000/todos?isFavorite=true"

# Par état de complétion
curl "http://localhost:3000/todos?isCompleted=true"

# Recherche par mot-clé
curl "http://localhost:3000/todos?search=projet"

# Combinaison de filtres
curl "http://localhost:3000/todos?priority=high&isFavorite=true&search=urgent"
```

### Statistiques
```bash
curl http://localhost:3000/todos/stats
```

Réponse :
```json
{
  "total": 10,
  "completed": 3,
  "pending": 7,
  "favorites": 2,
  "byPriority": {
    "high": 2,
    "medium": 5,
    "low": 3
  }
}
```

## 🔧 Technologies utilisées

- **NestJS** - Framework Node.js progressif
- **TypeScript** - Superset typé de JavaScript
- **class-validator** - Validation déclarative des DTOs
- **class-transformer** - Transformation des objets
- **Swagger/OpenAPI** - Documentation automatique
- **Jest** - Framework de tests

## 🎯 Bonnes pratiques implémentées

- ✅ Architecture modulaire avec séparation des responsabilités
- ✅ DTOs avec validation stricte pour toutes les entrées
- ✅ Services injectables pour la logique métier
- ✅ Gestion d'erreurs standardisée avec exceptions HTTP
- ✅ Documentation automatique avec Swagger
- ✅ Tests unitaires complets
- ✅ Code TypeScript strictement typé
- ✅ Validation des données côté serveur
- ✅ Structure RESTful cohérente
- ✅ Gestion des horodatages automatique